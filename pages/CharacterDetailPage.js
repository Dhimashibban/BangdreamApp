import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import Colors from '../styles/Colors';

export default function CharacterDetailPage({ route }) {
  const { character } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Gambar Karakter */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: character.image }}
          style={styles.characterImage}
          resizeMode="contain"
        />
      </View>

      {/* Nama Karakter */}
      <Text style={styles.name}>{character.name}</Text>
      <Text style={styles.japaneseName}>{character.japanese_name}</Text>

      {/* Kotak Detail */}
      <View style={styles.detailBox}>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Band:</Text>
          <Text style={styles.detailValue}>{character.i_band}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>School:</Text>
          <Text style={styles.detailValue}>{character.school}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Year:</Text>
          <Text style={styles.detailValue}>{character.i_school_year}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Birthday:</Text>
          <Text style={styles.detailValue}>{character.birthday}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Food Likes:</Text>
          <Text style={styles.detailValue}>{character.food_like}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Food Dislikes:</Text>
          <Text style={styles.detailValue}>{character.food_dislike}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Astrological Sign:</Text>
          <Text style={styles.detailValue}>{character.i_astrological_sign}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Instrument:</Text>
          <Text style={styles.detailValue}>{character.instrument}</Text>
        </View>
        <View style={styles.detailRow}>
          <Text style={styles.detailTitle}>Description:</Text>
          <Text style={styles.detailValue}>{character.description}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  characterImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  japaneseName: {
    fontSize: 18,
    fontStyle: 'italic',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 20,
  },
  detailBox: {
    backgroundColor: Colors.primary, // Menggunakan warna ungu
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.textLight, // Warna teks terang agar kontras
  },
  detailValue: {
    flex: 2,
    fontSize: 16,
    color: Colors.textLight, // Warna teks terang agar kontras
  },
});
