// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046
// Fatima Batool SP21-BCS-108

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const UploadSyllabus = () => {
  const [selectedClass, setSelectedClass] = useState(null); // Initialize selectedClass as null
  const [syllabus, setSyllabus] = useState(null);
  const [classData, setClassData] = useState([]);

  useEffect(() => {
    fetchClassData();
  }, []);

  const fetchClassData = async () => {
    try {
      const snapshot = await firestore().collection('Class').get();
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClassData(data);

      // If a class is already selected, update its syllabus state
      if (selectedClass) {
        const selectedClassData = data.find(item => item.id === selectedClass.id);
        setSyllabus(selectedClassData ? { base64: selectedClassData.syllabus } : null);
      }
    } catch (error) {
      console.error('Error fetching class data: ', error);
      Alert.alert('Error', 'Failed to fetch class data. Please try again.');
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
        uploadSyllabus(base64Image);
      }
    });
  };

  const uploadSyllabus = async base64Image => {
    try {
      await firestore().collection('Class').doc(selectedClass.id).update({ syllabus: base64Image });

      Alert.alert('Success', 'Syllabus uploaded successfully.');
      fetchClassData(); // Refresh class data

    } catch (error) {
      console.error('Error uploading syllabus: ', error);
      Alert.alert('Error', 'Failed to upload syllabus. Please try again.');
    }
  };

  const deleteSyllabus = async () => {
    try {
      await firestore().collection('Class').doc(selectedClass.id).update({ syllabus: null });

      Alert.alert('Success', 'Syllabus deleted successfully.');
      fetchClassData(); // Refresh class data

    } catch (error) {
      console.error('Error deleting syllabus: ', error);
      Alert.alert('Error', 'Failed to delete syllabus. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Upload Syllabus</Text>
      <Text style={styles.label}>Select Class</Text>
      <Picker
        selectedValue={selectedClass}
        onValueChange={(itemValue) => {
          setSelectedClass(itemValue);
          setSyllabus(itemValue ? { base64: itemValue.syllabus } : null); // Update syllabus state when class is changed
        }}
        style={styles.picker}
      >
        <Picker.Item label="Select Class" value={null} />
        {classData.map(item => (
          <Picker.Item key={item.id} label={item.ClassName} value={item} />
        ))}
      </Picker>
      {syllabus && syllabus.base64 ? (
        <>
          <Image source={{ uri: `data:image/jpeg;base64,${syllabus.base64}` }} style={styles.image} />
          <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={deleteSyllabus}>
            <Text style={styles.buttonText}>Delete Syllabus</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={[styles.button, { backgroundColor: '#1B6A8B' }]} onPress={chooseImage}>
          <Text style={styles.buttonText}>Upload Syllabus</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 50,
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

export default UploadSyllabus;





