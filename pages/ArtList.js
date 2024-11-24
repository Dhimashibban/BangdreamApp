import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Colors from '../styles/Colors';

export default function ArtList({ navigation }) {
  const [arts, setArts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [nextUrl, setNextUrl] = useState('http://bandori.party/api/assets/');
  
  // Function to fetch data from API
  const fetchArts = async () => {
    if (!nextUrl || loading) return; // Stop fetching if no next URL or already loading
    setLoading(true);
    try {
      const response = await axios.get(nextUrl);
      const newArts = response.data.results.filter(item => item.i_type === 'officialart'); // Only include officialart
      setArts(prevArts => [...prevArts, ...newArts]);
      setNextUrl(response.data.next); // Update next URL
    } catch (error) {
      console.error('Error fetching art list:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArts(); // Initial fetch
  }, []);

  const renderArt = ({ item }) => (
    <TouchableOpacity
      style={styles.artContainer}
      onPress={() => navigation.navigate('ArtDetail', { art: item })}
    >
      <Image source={{ uri: item.image }} style={styles.artImage} />
      <Text style={styles.artTitle}>{item.i_band}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Official Arts</Text>
      <FlatList
        data={arts}
        renderItem={renderArt}
        keyExtractor={item => item.id.toString()}
        onEndReached={fetchArts} // Fetch more data when scrolling to the end
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading ? <ActivityIndicator size="large" color={Colors.primary} /> : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  artContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    backgroundColor: Colors.secondary,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
  },
  artImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  artTitle: {
    fontSize: 16,
    color: Colors.text,
    padding: 10,
    textAlign: 'center',
  },
});
