// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046
// Fatima Batool SP21-BCS-108
// Muhammad Armughan Safdar FA21-BCS-050

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';

const UploadTimeTable = () => {
  const [timetable, setTimetable] = useState(null);

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const documentSnapshot = await firestore().collection('TimeTable').doc('time').get();
      if (documentSnapshot.exists) {
        const timetableData = documentSnapshot.data();
        setTimetable(timetableData);
      } else {
        console.log('No timetable found');
      }
    } catch (error) {
      console.error('Error fetching timetable: ', error);
      Alert.alert('Error', 'Failed to fetch timetable. Please try again.');
    }
  };

  const chooseImage = () => {
    ImagePicker.launchImageLibrary({ mediaType: 'photo', includeBase64: true }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const base64Image = response.assets[0].base64; // Get the base64 string of the image
        uploadTimetable(base64Image);
      }
    });
  };

  const uploadTimetable = async base64Image => {
    try {
      await firestore().collection('TimeTable').doc('time').update({ url: base64Image });

      setTimetable({ url: base64Image });

      Alert.alert('Success', 'Timetable uploaded successfully.');
    } catch (error) {
      console.error('Error uploading timetable: ', error);
      Alert.alert('Error', 'Failed to upload timetable. Please try again.');
    }
  };

  const deleteTimetable = async () => {
    try {
      await firestore().collection('TimeTable').doc('time').update({ url: firestore.FieldValue.delete() });

      Alert.alert('Success', 'Timetable deleted successfully.');

      setTimetable(null);
    } catch (error) {
      console.error('Error deleting timetable: ', error);
      Alert.alert('Error', 'Failed to delete timetable. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Timetable</Text>
      {timetable && timetable.url ? (
        <>
          <Image source={{ uri: `data:image/jpeg;base64,${timetable.url}` }} style={styles.image} />
          <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={deleteTimetable}>
            <Text style={styles.buttonText}>Delete Timetable</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1B6A8B' }]} onPress={chooseImage}>
          <Text style={styles.buttonText}>Upload Timetable</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginBottom: 20,
  },
});

export default UploadTimeTable;


