// This screen was developed by Group Members:
// Fatima Batool SP21-BCS-108
// Muhammad Armughan Safdar FA21-BCS-050

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const ViewFeeRecord = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [selectedClass, setSelectedClass] = useState('');

  const handleViewFeeRecords = () => {
    if (!registrationNumber || !studentName || !selectedClass) {
      alert('Please fill all fields before proceeding');
      return;
    }
    navigation.navigate('ViewFee', {
      registrationNumber,
      studentName,
      selectedClass,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Fees</Text>
      <RNPickerSelect
        onValueChange={(value) => setSelectedClass(value)}
        items={[
          { label: 'Nursery', value: 'Nursery' },
          { label: 'Prep', value: 'Prep' },
          { label: 'Class 1', value: 'Class 1' },
          { label: 'Class 2', value: 'Class 2' },
          { label: 'Class 3', value: 'Class 3' },
          { label: 'Class 4', value: 'Class 4' },
          { label: 'Class 5', value: 'Class 5' },
          { label: 'Class 6', value: 'Class 6' },
          { label: 'Class 7', value: 'Class 7' },
          { label: 'Class 8', value: 'Class 8' },
        ]}
        style={pickerSelectStyles}
        placeholder={{
          label: 'Select Class',
          value: null,
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Registration Number"
        keyboardType="numeric"
        value={registrationNumber}
        onChangeText={setRegistrationNumber}
      />
      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewFeeRecords}>
          <Text style={styles.buttonText}>View Fee Records</Text>
        </TouchableOpacity>
      </View>
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
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    width: '80%',
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    marginBottom: 10,
    width: '80%',
  },
});

export default ViewFeeRecord;
