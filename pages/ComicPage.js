import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Modal, Dimensions } from 'react-native';
import axios from 'axios';
import Colors from '../styles/Colors';
import { GestureHandlerRootView, TapGestureHandler } from 'react-native-gesture-handler';

export default function ComicPage() {
  const [comics, setComics] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedComic, setSelectedComic] = useState(null);
  const [nextPage, setNextPage] = useState('http://bandori.party/api/assets/');

  const fetchComics = (url) => {
    axios.get(url)
      .then(response => {
        const comicData = response.data.results.filter(item => item.i_type === 'comic');
        setComics(prevComics => [...prevComics, ...comicData]);
        setNextPage(response.data.next);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    if (nextPage) {
      fetchComics(nextPage);
    }
  }, [nextPage]);

  const handleComicPress = (comicImage) => {
    setSelectedComic(comicImage);
    setModalVisible(true);
  };

  const handleOutsidePress = () => {
    setModalVisible(false);
  };

  const renderComicItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleComicPress(item.english_image)} style={styles.comicCard}>
      {/* Menampilkan Nomor Urut */}
      <Text style={styles.comicNumber}>{index + 1}</Text>
      <Image source={{ uri: item.english_image }} style={styles.comicImage} resizeMode="contain" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>4-Koma Bang Dream Comics</Text>
      <FlatList
        data={comics}
        renderItem={renderComicItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        onEndReached={() => nextPage && fetchComics(nextPage)}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContainer}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={handleOutsidePress}
      >
        <GestureHandlerRootView style={styles.modalContainer}>
          <TapGestureHandler onHandlerStateChange={handleOutsidePress}>
            <View style={styles.modalContainer}>
              <Image
                source={{ uri: selectedComic }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            </View>
          </TapGestureHandler>
        </GestureHandlerRootView>
      </Modal>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    alignItems: 'center',
  },
  comicCard: {
    backgroundColor: Colors.primary,
    marginBottom: 15,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 4,
    position: 'relative', // Membuat ruang untuk nomor
  },
  comicImage: {
    width: Dimensions.get('window').width - 40,
    height: 200,
    borderRadius: 10,
  },
  comicNumber: {
    position: 'absolute',
    top: 10,
    left: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textLight,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Untuk memastikan teks terlihat jelas
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalImage: {
    width: Dimensions.get('window').width - 20,
    height: Dimensions.get('window').height - 100,
  },
});
