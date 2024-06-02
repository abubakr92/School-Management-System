// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046 = BACKEND
// Muhammad Armughan Safdar FA21-BCS-050 = FRONT END

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { Picker } from '@react-native-picker/picker';

const ManageFees = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [studentName, setStudentName] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [lateFees, setLateFees] = useState(false);
  const [feeStatus, setFeeStatus] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

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

  const handleStudentChange = async (studentId) => {
    setSelectedStudent(studentId);
    const studentDoc = await firestore().collection('Student').doc(studentId).get();
    const studentData = studentDoc.data();
    setStudentName(studentData.name);
    if (studentData.feeStatus) {
      setAmountDue(studentData.feeStatus.amountDue.toString());
      setAmountPaid(studentData.feeStatus.amountPaid.toString());
      setPayableAmount(studentData.feeStatus.payableAmount.toString());
      setLateFees(studentData.feeStatus.lateFees);
      setFeeStatus(true);
    } else {
      setAmountDue('');
      setAmountPaid('');
      setPayableAmount('');
      setLateFees(false);
      setFeeStatus(false);
    }
  };

  const handleSaveFeeStatus = async () => {
    try {
      const feeStatus = {
        amountDue: parseFloat(amountDue),
        amountPaid: parseFloat(amountPaid),
        payableAmount: parseFloat(payableAmount),
        feesPaid: true,
        lateFees: lateFees,
      };
      await firestore().collection('Student').doc(selectedStudent).update({ feeStatus });

      Alert.alert('Success', 'Fee status updated successfully.');
      setFeeStatus(true);
    } catch (error) {
      console.error('Error updating fee status: ', error);
      Alert.alert('Error', 'Failed to update fee status. Please try again.');
    }
  };

  const handleDeleteFeeStatus = async () => {
    try {
      await firestore().collection('Student').doc(selectedStudent).update({ feeStatus: firestore.FieldValue.delete() });

      setAmountDue('');
      setAmountPaid('');
      setPayableAmount('');
      setLateFees(false);
      setFeeStatus(false);

      Alert.alert('Success', 'Fee status deleted successfully.');
    } catch (error) {
      console.error('Error deleting fee status: ', error);
      Alert.alert('Error', 'Failed to delete fee status. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Manage Student Fees</Text>
      
      <Picker
        selectedValue={selectedStudent}
        onValueChange={(itemValue) => handleStudentChange(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select Registration" value="" />
        {students.map(student => (
          <Picker.Item key={student.id} label={student.registrationNumber} value={student.id} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Student Name"
        value={studentName}
        onChangeText={setStudentName}
        editable={false}
      />

      <TextInput
        style={styles.input}
        placeholder="Amount Due"
        value={amountDue}
        onChangeText={setAmountDue}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Amount Paid"
        value={amountPaid}
        onChangeText={setAmountPaid}
        keyboardType="numeric"
      />

      <TextInput
        style={styles.input}
        placeholder="Payable Amount"
        value={payableAmount}
        onChangeText={setPayableAmount}
        keyboardType="numeric"
      />

      {feeStatus ? (
        <Button title="Delete Fee Status" onPress={handleDeleteFeeStatus} color="red" />
      ) : (
        <Button title="Save Fee Status" onPress={handleSaveFeeStatus} />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default ManageFees;