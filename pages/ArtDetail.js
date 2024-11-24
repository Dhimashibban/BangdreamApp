import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

export default function ArtDetail({ route }) {
  const { art } = route.params;

  return (
    <View style={styles.container}>
      <Image source={{ uri: art.image }} style={styles.image} />
      <View style={styles.detailContainer}>
        <Text style={styles.title}>Official Art Details</Text>
        <Text style={styles.detail}><Text style={styles.label}>Band:</Text> {art.i_band || 'Unknown Band'}</Text>
        <Text style={styles.detail}><Text style={styles.label}>Source:</Text> {art.source || 'No Source Info'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  detailContainer: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
