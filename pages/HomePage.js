import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Linking } from 'react-native';
import { Video } from 'expo-av';
import axios from 'axios';
import Colors from '../styles/Colors';

export default function HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios
      .get('http://bandori.party/api/events/')
      .then(response => setEvents(response.data.results))
      .catch(error => console.error(error));
  }, []);

  const handleBannerPress = () => {
    // Open the URL when banner is pressed
    Linking.openURL('https://bandori.party/events/')
      .catch(err => console.error('Failed to open URL:', err));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={handleBannerPress}>
      <Image source={{ uri: item.image }} style={styles.banner} resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bang Dream</Text>

      <FlatList
        data={events}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        snapToInterval={300}
        snapToAlignment="center"
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bannerContainer}
      />

      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Bang Dream! adalah game rhythm dengan band favorit seperti Roselia.
          Nikmati pengalaman bermain dengan koleksi karakter yang penuh warna dan lagu-lagu menarik!
        </Text>
      </View>

      <View style={styles.videoContainer}>
        <Video
          source={require('../assets/videos/bang-dream-bandori.mp4')}
          style={styles.video}
          resizeMode="contain"
          isLooping
          shouldPlay
          isMuted
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  banner: {
    width: 270,
    height: 250,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  bannerContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  descriptionContainer: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  videoContainer: {
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginHorizontal: 10,
    backgroundColor: '#000',
  },
  video: {
    flex: 1,
  },
});
