// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046



import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';

const ManageStudents = ({ navigation }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showStudentList, setShowStudentList] = useState(false);
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    registrationNumber: '',
    admissionDate: '',
    name: '',
    dateOfBirth: '',
    gender: '',
    fatherName: '',
    caste: '',
    occupation: '',
    residence: '',
    admissionClass: '',
    email: '',
    password: '',
    remarks: ''
  });

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchRegistrationNumber, setSearchRegistrationNumber] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      const snapshot = await firebase.firestore().collection('Student').get();
      const fetchedStudents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(fetchedStudents);
    };
    fetchStudents();
  }, []);

  const validateFields = () => {
    for (const [key, value] of Object.entries(newStudent)) {
      if (value.trim() === '') {
        Alert.alert('Error', `Please fill in the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }
    return true;
  };

  const handleAddStudent = async () => {
    if (!validateFields()) {
      return;
    }

    try {
      await firebase.firestore().collection('Student').add(newStudent);
      Alert.alert('Success', 'Student added successfully');
      setShowAddForm(false);
      setNewStudent({
        registrationNumber: '',
        admissionDate: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        fatherName: '',
        caste: '',
        occupation: '',
        residence: '',
        admissionClass: '',
        email: '',
        password: '',
        remarks: ''
      });

      // Refresh the students list after adding a new student
      const snapshot = await firebase.firestore().collection('Student').get();
      const fetchedStudents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error adding student: ', error);
      Alert.alert('Error', 'Failed to add student');
    }
  };

  const handleEditStudent = async () => {
    if (!selectedStudent) {
      Alert.alert('Error', 'No student selected for editing');
      return;
    }

    try {
      await firebase.firestore().collection('Student').doc(selectedStudent.id).update(newStudent);
      Alert.alert('Success', 'Student updated successfully');
      setSelectedStudent(null);
      setNewStudent({
        registrationNumber: '',
        admissionDate: '',
        name: '',
        dateOfBirth: '',
        gender: '',
        fatherName: '',
        caste: '',
        occupation: '',
        residence: '',
        admissionClass: '',
        email: '',
        password: '',
        remarks: ''
      });

      // Refresh the students list after editing a student
      const snapshot = await firebase.firestore().collection('Student').get();
      const fetchedStudents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudents(fetchedStudents);
    } catch (error) {
      console.error('Error updating student: ', error);
      Alert.alert('Error', 'Failed to update student');
    }
  };

  const handleSearchStudent = async () => {
    try {
      const querySnapshot = await firebase.firestore().collection('Student').where('registrationNumber', '==', searchRegistrationNumber).get();

      if (!querySnapshot.empty) {
        const studentDoc = querySnapshot.docs[0];
        const studentData = studentDoc.data();
        setSelectedStudent({ id: studentDoc.id, ...studentData });
        setNewStudent({
          registrationNumber: studentData.registrationNumber,
          admissionDate: studentData.admissionDate,
          name: studentData.name,
          dateOfBirth: studentData.dateOfBirth,
          gender: studentData.gender,
          fatherName: studentData.fatherName,
          caste: studentData.caste,
          occupation: studentData.occupation,
          residence: studentData.residence,
          admissionClass: studentData.admissionClass,
          email: studentData.email,
          password: studentData.password,
          remarks: studentData.remarks
        });
      } else {
        Alert.alert('Error', 'Student not found');
      }
    } catch (error) {
      console.error('Error searching student: ', error);
      Alert.alert('Error', 'Failed to search student');
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setSelectedStudent(null);
    setNewStudent({
      registrationNumber: '',
      admissionDate: '',
      name: '',
      dateOfBirth: '',
      gender: '',
      fatherName: '',
      caste: '',
      occupation: '',
      residence: '',
      admissionClass: '',
      email: '',
      password: '',
      remarks: ''
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Manage Students</Text>
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.optionButton} onPress={() => setShowAddForm(true)}>
          <Text style={styles.optionButtonText}>Add Student</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionButton} onPress={() => setShowStudentList(!showStudentList)}>
          <Text style={styles.optionButtonText}>View Students</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search by Registration Number"
          value={searchRegistrationNumber}
          onChangeText={text => setSearchRegistrationNumber(text)}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearchStudent}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {selectedStudent && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Registration Number"
            value={newStudent.registrationNumber}
            onChangeText={text => setNewStudent({ ...newStudent, registrationNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Admission"
            value={newStudent.admissionDate}
            onChangeText={text => setNewStudent({ ...newStudent, admissionDate: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Student"
            value={newStudent.name}
            onChangeText={text => setNewStudent({ ...newStudent, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={newStudent.dateOfBirth}
            onChangeText={text => setNewStudent({ ...newStudent, dateOfBirth: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Student Gender"
            value={newStudent.gender}
            onChangeText={text => setNewStudent({ ...newStudent, gender: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Father's Name"
            value={newStudent.fatherName}
            onChangeText={text => setNewStudent({ ...newStudent, fatherName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Caste"
            value={newStudent.caste}
            onChangeText={text => setNewStudent({ ...newStudent, caste: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Occupation"
            value={newStudent.occupation}
            onChangeText={text => setNewStudent({ ...newStudent, occupation: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Residence"
            value={newStudent.residence}
            onChangeText={text => setNewStudent({ ...newStudent, residence: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Admission Class"
            value={newStudent.admissionClass}
            onChangeText={text => setNewStudent({ ...newStudent, admissionClass: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newStudent.email}
            onChangeText={text => setNewStudent({ ...newStudent, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={newStudent.password}
            onChangeText={text => setNewStudent({ ...newStudent, password: text })}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={newStudent.remarks}
            onChangeText={text => setNewStudent({ ...newStudent, remarks: text })}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleEditStudent}>
            <Text style={styles.addButtonText}>Update Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {showAddForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Registration Number"
            value={newStudent.registrationNumber}
            onChangeText={text => setNewStudent({ ...newStudent, registrationNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Admission"
            value={newStudent.admissionDate}
            onChangeText={text => setNewStudent({ ...newStudent, admissionDate: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Name of Student"
            value={newStudent.name}
            onChangeText={text => setNewStudent({ ...newStudent, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth"
            value={newStudent.dateOfBirth}
            onChangeText={text => setNewStudent({ ...newStudent, dateOfBirth: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Student Gender"
            value={newStudent.gender}
            onChangeText={text => setNewStudent({ ...newStudent, gender: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Father's Name"
            value={newStudent.fatherName}
            onChangeText={text => setNewStudent({ ...newStudent, fatherName: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Caste"
            value={newStudent.caste}
            onChangeText={text => setNewStudent({ ...newStudent, caste: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Occupation"
            value={newStudent.occupation}
            onChangeText={text => setNewStudent({ ...newStudent, occupation: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Residence"
            value={newStudent.residence}
            onChangeText={text => setNewStudent({ ...newStudent, residence: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Admission Class"
            value={newStudent.admissionClass}
            onChangeText={text => setNewStudent({ ...newStudent, admissionClass: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={newStudent.email}
            onChangeText={text => setNewStudent({ ...newStudent, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={newStudent.password}
            onChangeText={text => setNewStudent({ ...newStudent, password: text })}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Remarks"
            value={newStudent.remarks}
            onChangeText={text => setNewStudent({ ...newStudent, remarks: text })}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddStudent}>
            <Text style={styles.addButtonText}>Add Student</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
      {showStudentList && (
        <View style={styles.studentListContainer}>
          {students.map((student) => (
            <View key={student.id} style={styles.studentItem}>
              <Text style={styles.studentItemText}>{student.name}</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  optionButton: {
    width: '48%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    borderRadius: 5,
  },
  optionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginRight: 10,
    paddingHorizontal: 10,
  },
  searchButton: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  formContainer: {
    marginBottom: 20,
  },
  addButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    borderRadius: 5,
    marginBottom: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cancelButton: {
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  studentListContainer: {
    marginTop: 20,
  },
  studentItem: {
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  studentItemText: {
    fontSize: 18,
  },
});

export default ManageStudents;
