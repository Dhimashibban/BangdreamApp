import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Untuk dropdown filter
import axios from 'axios';
import Colors from '../styles/Colors';

export default function CharacterListPage({ navigation }) {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [bands, setBands] = useState(['All']);
  const [selectedBand, setSelectedBand] = useState('All');
  const [loading, setLoading] = useState(false);

  // Fetch all characters recursively until "next" is null
  const fetchAllCharacters = async (url = 'https://bandori.party/api/members/') => {
    setLoading(true);
    let allCharacters = [];
    try {
      while (url) {
        const response = await axios.get(url);
        const results = response.data.results;

        allCharacters = [...allCharacters, ...results];
        url = response.data.next; // Update URL to the next page
      }
      
      setCharacters(allCharacters);
      setFilteredCharacters(allCharacters);

      // Extract unique bands
      const uniqueBands = ['All', ...new Set(allCharacters.map((character) => character.i_band).filter(Boolean))];
      setBands(uniqueBands);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCharacters();

    // Remove the header for this screen
    navigation.setOptions({
      headerShown: false, // This will hide the header
    });
  }, []);

  // Handle filter change
  const handleFilterChange = (band) => {
    setSelectedBand(band);

    if (band === 'All') {
      setFilteredCharacters(characters); // Show all characters
    } else {
      setFilteredCharacters(characters.filter((character) => character.i_band === band));
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.characterCard}
      onPress={() => navigation.navigate('CharacterDetail', { character: item })}
    >
      <View style={styles.characterImageContainer}>
        <Image source={{ uri: item.square_image }} style={styles.characterImage} resizeMode="contain" />
      </View>
      <Text style={styles.characterName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Filter Dropdown */}
      <Picker
        selectedValue={selectedBand}
        style={styles.picker}
        onValueChange={(itemValue) => handleFilterChange(itemValue)}
      >
        {bands.map((band, index) => (
          <Picker.Item key={index} label={band} value={band} />
        ))}
      </Picker>

      {loading ? (
        <ActivityIndicator size="large" color={Colors.primary} />
      ) : (
        <FlatList
          data={filteredCharacters}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  characterCard: {
    flex: 1,
    margin: 10,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  characterImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textLight,
    textAlign: 'center',
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingBottom: 100,
  },
});
