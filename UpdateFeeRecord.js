// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046
// Fatima Batool SP21-BCS-108

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const UpdateFeeRecord = ({ navigation }) => {
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [amountDue, setAmountDue] = useState('');
  const [amountPaid, setAmountPaid] = useState('');
  const [payableAmount, setPayableAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [lateFees, setLateFees] = useState('');
  const [remarks, setRemarks] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleUpdate = () => {
    if (
      !registrationNumber ||
      !studentName ||
      !amountDue ||
      !amountPaid ||
      !payableAmount ||
      !paymentDate ||
      !lateFees ||
      !remarks
    ) {
      setErrorMessage('Please fill all fields before updating');
    } else {
      setErrorMessage('');
      setRegistrationNumber('');
      setStudentName('');
      setAmountDue('');
      setAmountPaid('');
      setPayableAmount('');
      setPaymentDate('');
      setLateFees('');
      setRemarks('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Update Fee Record</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Amount Due"
        keyboardType="numeric"
        value={amountDue}
        onChangeText={setAmountDue}
      />
      <TextInput
        style={styles.input}
        placeholder="Amount Paid"
        keyboardType="numeric"
        value={amountPaid}
        onChangeText={setAmountPaid}
      />
      <TextInput
        style={styles.input}
        placeholder="Payable Amount"
        keyboardType="numeric"
        value={payableAmount}
        onChangeText={setPayableAmount}
      />
      <TextInput
        style={styles.input}
        placeholder="Payment Date"
        value={paymentDate}
        onChangeText={setPaymentDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Late Fees (Yes/No)"
        value={lateFees}
        onChangeText={setLateFees}
      />
      <TextInput
        style={styles.input}
        placeholder="Remarks"
        value={remarks}
        onChangeText={setRemarks}
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
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
  button: {
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 10,
  },
});

export default UpdateFeeRecord;
