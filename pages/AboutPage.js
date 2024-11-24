import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../styles/Colors';

export default function AboutPage() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>About the Developer</Text>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: 'https://i.ibb.co.com/PF9CxVT/profile.jpg' }} // Ganti dengan foto asli
          style={styles.profileImage}
        />
        <Text style={styles.name}>Dhimas Hibban Athallah</Text>
        <Text style={styles.info}>NIM: 21120122140162</Text>
        <Text style={styles.info}>Jurusan: Teknik Komputer</Text>
      </View>

      {/* About Me Section */}
      <View style={styles.aboutMeContainer}>
        <Text style={styles.aboutMeHeader}>About Me</Text>
        <Text style={styles.aboutMeText}>
          Saya merupakan mahasiswa Universitas Diponegoro yang pensaran akan hal mengenai pengembangan aplikasi.
          Proyek ini merupakan salah satu tugas besar praktikum Pengembangan Perangkat Bergerak yang saya ampuh.
          Aplikasi ini dibuat bukan hanya sekedar untuk pembuatan tugas akhir saja namun untuk mempermudah saya membaca comic Bangdream :v
        </Text>
      </View>

      {/* Description */}
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          Aplikasi ini dibuat sebagai bagian dari proyek menggunakan React Native dan Expo. 
          Saya adalah mahasiswa yang antusias belajar teknologi terbaru dan membangun aplikasi menarik.
        </Text>
        <Text style={styles.thankYou}>
          Terima kasih telah menggunakan aplikasi ini!
        </Text>
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
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 5,
  },
  info: {
    fontSize: 16,
    color: Colors.text,
    marginBottom: 5,
  },
  aboutMeContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    padding: 20,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  aboutMeHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.textLight,
    marginBottom: 10,
    textAlign: 'center',
  },
  aboutMeText: {
    fontSize: 16,
    color: Colors.textLight,
    textAlign: 'center',
  },
  descriptionContainer: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  description: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
  },
  thankYou: {
    fontSize: 16,
    color: Colors.text,
    textAlign: 'center',
    marginTop: 10,
  },
});
