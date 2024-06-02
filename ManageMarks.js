// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const ManageMarks = ({ navigation }) => {
  const [assignedClass, setAssignedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [firstTerm, setFirstTerm] = useState('');
  const [midTerm, setMidTerm] = useState('');
  const [finalTerm, setFinalTerm] = useState('');

  useEffect(() => {
    fetchAssignedClass();
  }, []);

  const fetchAssignedClass = async () => {
    try {
      const teacherId = auth().currentUser.uid; // Get the current logged-in teacher's ID
      const classSnapshot = await firestore().collection('Class').where('Tid', '==', teacherId).get();

      if (!classSnapshot.empty) {
        const classData = classSnapshot.docs[0].data();
        const className = classData.ClassName;
        setAssignedClass(className);

        fetchStudents(className);
        fetchSubjects(className);
      } else {
        setAssignedClass('No Class Assigned');
      }
    } catch (error) {
      console.error('Error fetching assigned class: ', error);
    }
  };

  const fetchStudents = async (className) => {
    try {
      const studentSnapshot = await firestore().collection('Student').where('admissionClass', '==', className).get();
      const fetchedStudents = studentSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error fetching students: ', error);
    }
  };

  const fetchSubjects = async (className) => {
    try {
      const classSnapshot = await firestore().collection('Class').where('ClassName', '==', className).get();
      if (!classSnapshot.empty) {
        const classData = classSnapshot.docs[0].data();
        setSubjects(classData.Subjects); // Assuming Subjects is an array field in the Class document
      }
    } catch (error) {
      console.error('Error fetching subjects: ', error);
    }
  };

  const uploadMarks = async () => {
    if (!selectedStudent || !selectedSubject || !firstTerm || !midTerm || !finalTerm) {
      Alert.alert('Error', 'Please select student, subject and enter all marks.');
      return;
    }

    try {
      await firestore().collection('Student').doc(selectedStudent).update({
        [`marks.${selectedSubject}.firstTerm`]: firstTerm,
        [`marks.${selectedSubject}.midTerm`]: midTerm,
        [`marks.${selectedSubject}.finalTerm`]: finalTerm,
      });
      Alert.alert('Success', 'Marks uploaded successfully.');
    } catch (error) {
      console.error('Error uploading marks: ', error);
      Alert.alert('Error', 'Failed to upload marks. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Marks</Text>
      <Text>Class Assigned:</Text>
      <Text style={styles.assignedClass}>{assignedClass}</Text>
      {assignedClass !== 'No Class Assigned' && (
        <>
          <Text>Select Student:</Text>
          <Picker
            selectedValue={selectedStudent}
            onValueChange={(itemValue) => setSelectedStudent(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Student" value="" />
            {students.map((student) => (
              <Picker.Item key={student.id} label={student.name} value={student.id} />
            ))}
          </Picker>

          <Text>Select Subject:</Text>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select Subject" value="" />
            {subjects.map((subject, index) => (
              <Picker.Item key={index} label={subject} value={subject} />
            ))}
          </Picker>

          <TextInput
            placeholder="First Term Marks"
            value={firstTerm}
            onChangeText={(text) => setFirstTerm(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Mid Term Marks"
            value={midTerm}
            onChangeText={(text) => setMidTerm(text)}
            keyboardType="numeric"
            style={styles.input}
          />
          <TextInput
            placeholder="Final Term Marks"
            value={finalTerm}
            onChangeText={(text) => setFinalTerm(text)}
            keyboardType="numeric"
            style={styles.input}
          />

          <TouchableOpacity style={styles.button} onPress={uploadMarks}>
            <Text style={styles.buttonText}>Upload Marks</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={() => navigation.navigate('TeacherDashboard')}
      >
        <Text style={styles.buttonText}>Back to Dashboard</Text>
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
  assignedClass: {
    fontSize: 18,
    marginBottom: 20,
  },
  picker: {
    height: 50,
    width: 250,
    marginBottom: 20,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ManageMarks;


