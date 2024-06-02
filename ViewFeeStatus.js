// This screen was developed by Group Member:
// Muhammad Abubakr Siddeeq FA21-BCS-046


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ViewFeeStatus = () => {
  const [students, setStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [searchQuery, students]);

  const fetchStudents = async () => {
    try {
      const snapshot = await firestore().collection('Student').get();
      const studentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(studentsData);
    } catch (error) {
      console.error('Error fetching students: ', error);
      Alert.alert('Error', 'Failed to fetch students. Please try again.');
    }
  };

  const filterStudents = () => {
    if (searchQuery === '') {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student => 
        student.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>View Fee Status</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by Registration Number"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      {filteredStudents.map(student => (
        <View key={student.id} style={styles.studentCard}>
          <Text style={styles.studentText}>Name: {student.name}</Text>
          <Text style={styles.studentText}>Registration Number: {student.registrationNumber}</Text>
          <Text style={styles.studentText}>Fees Paid: {student.feeStatus?.feesPaid ? 'Yes' : 'No'}</Text>
          <Text style={styles.studentText}>Amount Paid: {student.feeStatus?.amountPaid ?? 'N/A'}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  studentCard: {
    width: '100%',
    padding: 15,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    borderRadius: 5,
  },
  studentText: {
    fontSize: 16,
  },
});

export default ViewFeeStatus;

