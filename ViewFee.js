// This screen was developed by Group Members:
// Fatima Batool SP21-BCS-108
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewFee = ({ navigation, route }) => {
  const { registrationNumber, studentName, selectedClass, success } = route.params;

  const feeRecords = {
    '1': {
      class: 'Class 1',
      name: 'John Doe',
      registrationNumber: '1',
      amountDue: '500',
      amountPaid: '300',
      payableAmount: '200',
      paymentDate: '2024-05-30',
      lateFees: 'No',
      remarks: 'Partial payment'
    },
    '2': {
      class: 'Class 2',
      name: 'Jane Doe',
      registrationNumber: '2',
      amountDue: '600',
      amountPaid: '600',
      payableAmount: '0',
      paymentDate: '2024-05-29',
      lateFees: 'No',
      remarks: 'Full payment'
    }
  };

  const studentRecord = Object.values(feeRecords).find(
    record => record.class === selectedClass && record.registrationNumber === registrationNumber
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>View Fee Records</Text>
      {success ? (
        <Text style={styles.successMessage}>Fee record added successfully!</Text>
      ) : null}
      {studentRecord ? (
        <View>
          <Text style={styles.label}>Registration Number: {studentRecord.registrationNumber}</Text>
          <Text style={styles.label}>Student Name: {studentRecord.name}</Text>
          <Text style={styles.label}>Class: {studentRecord.class}</Text>
          <Text style={styles.label}>Amount Due: {studentRecord.amountDue}</Text>
          <Text style={styles.label}>Amount Paid: {studentRecord.amountPaid}</Text>
          <Text style={styles.label}>Payable Amount: {studentRecord.payableAmount}</Text>
          <Text style={styles.label}>Payment Date: {studentRecord.paymentDate}</Text>
          <Text style={styles.label}>Late Fees: {studentRecord.lateFees}</Text>
          <Text style={styles.label}>Remarks: {studentRecord.remarks}</Text>
        </View>
      ) : (
        <Text style={styles.label}>No record found for the provided details.</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  successMessage: {
    fontSize: 18,
    color: 'green',
    marginBottom: 10,
  },
});

export default ViewFee;
