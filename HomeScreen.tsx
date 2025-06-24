import React, { useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  HomeScreen: undefined;
  SlotSelection: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/GoogleMapTA.webp')}
        style={styles.map}
      />

      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.menuButton}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>☰</Text>
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.bottomCard}>
        <Text style={styles.placeName}>Loyola-ICAM College of Engineering and Technology</Text>
        <Text style={styles.placeAddress}>Loyola Campus, Nungambakkam, Chennai 600034</Text>
        <Text style={styles.availability}>Availability Status: Available</Text>

        <TouchableOpacity
          style={styles.parkNowButton}
          onPress={() => navigation.navigate('SlotSelection')}
        >
          <Text style={styles.parkNowText}>Park Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  searchContainer: {
    position: 'absolute',
    top: 50,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 15,
    elevation: 3,
  },
  bottomCard: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#0D1321',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  placeName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  placeAddress: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 10,
  },
  availability: {
    color: '#9ACD32',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  parkNowButton: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  parkNowText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
