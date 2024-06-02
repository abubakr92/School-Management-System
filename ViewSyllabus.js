// This screen was developed by Group Member:
// Muhammad Abubakr Siddeeq FA21-BCS-046

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewSyllabus = ({ navigation }) => {
  const [syllabusUrl, setSyllabusUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const fetchSyllabus = async () => {
    try {
      const classDoc = await firestore().collection('Class').doc('class2').get(); 
      if (classDoc.exists) {
        const classData = classDoc.data();
        setSyllabusUrl(classData.syllabusUrl);
      } else {
        console.log('Class document does not exist');
      }
    } catch (error) {
      console.error('Error fetching syllabus: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Syllabus</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : syllabusUrl ? (
        <Image
          source={{ uri: syllabusUrl }}
          style={styles.syllabus}
        />
      ) : (
        <Text>No syllabus available for Class 2.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  syllabus: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
  },
});

export default ViewSyllabus;

