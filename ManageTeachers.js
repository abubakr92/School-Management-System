// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046
// Fatima Batool SP21-BCS-108


import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const ManageTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [classAssigned, setClassAssigned] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const snapshot = await firestore().collection('Teacher').get();
        const fetchedTeachers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTeachers(fetchedTeachers);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        Alert.alert("Error", "Failed to fetch teachers");
      }
    };

    const fetchClasses = async () => {
      try {
        const snapshot = await firestore().collection('Class').get();
        const fetchedClasses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setClasses(fetchedClasses);
      } catch (error) {
        console.error("Error fetching classes:", error);
        Alert.alert("Error", "Failed to fetch classes");
      }
    };

    fetchTeachers();
    fetchClasses();
  }, []);

  const handleAssignClass = async () => {
    if (!selectedTeacher || !classAssigned) {
      Alert.alert('Error', 'Please select a teacher and a class');
      return;
    }
  
    if (selectedTeacher.Assigned) {
      Alert.alert('Error', 'This teacher is already assigned to a class');
      return;
    }
  
    try {
      // Update the teacher's document
      await firestore().collection('Teacher').doc(selectedTeacher.id).update({ Assigned: true, classAssigned: classAssigned });
  
      // Update the class document
      await firestore().collection('Class').doc(classAssigned).update({ Tid: selectedTeacher.id });
  
      Alert.alert('Success', 'Class assigned successfully');
  
      // Refresh the data
      fetchTeachers();
      fetchClasses();
  
      // Clear the selected teacher and class
      setClassAssigned('');
      setSelectedTeacher(null);
    } catch (error) {
      console.error('Error assigning class: ', error);
      Alert.alert('Error', 'Failed to assign class');
    }
  };
  
  // const handleAssignClass = async () => {
  //   if (!selectedTeacher || !classAssigned) {
  //     Alert.alert('Error', 'Please select a teacher and a class');
  //     return;
  //   }

  //   if (selectedTeacher.Assigned) {
  //     Alert.alert('Error', 'This teacher is already assigned to a class');
  //     return;
  //   }

  //   try {
  //     // Update the teacher's document
  //     await firestore().collection('Teacher').doc(selectedTeacher.id).update({ Assigned: true, classAssigned: classAssigned });

  //     // Update the class document
  //     await firestore().collection('Class').doc(classAssigned).update({ Tid: selectedTeacher.id });

  //     Alert.alert('Success', 'Class assigned successfully');
  //     setClassAssigned('');
  //     setSelectedTeacher(null);

  //     // Refresh the data
  //     fetchTeachers();
  //     fetchClasses();
  //   } catch (error) {
  //     console.error('Error assigning class: ', error);
  //     Alert.alert('Error', 'Failed to assign class');
  //   }
  // };

  const handleRemoveClass = async () => {
    try {
      // Update the class document
      await firestore().collection('Class').doc(selectedTeacher.classAssigned).update({ Tid: null });

      // Update the teacher's document
      await firestore().collection('Teacher').doc(selectedTeacher.id).update({ Assigned: false, classAssigned: '' });

      Alert.alert('Success', 'Class unassigned successfully');
      setClassAssigned('');
      setSelectedTeacher(null);

      // Refresh the data
      fetchTeachers();
      fetchClasses();
    } catch (error) {
      console.error('Error unassigning class: ', error);
      Alert.alert('Error', 'Failed to unassign class');
    }
  };

  const handleTeacherSearch = (teacherId) => {
    const teacher = teachers.find(t => t.id === teacherId);
    if (teacher) {
      setSelectedTeacher(teacher);
    } else {
      Alert.alert('Error', 'Teacher not found');
    }
  };

  const fetchTeachers = async () => {
    try {
      const snapshot = await firestore().collection('Teacher').get();
      const fetchedTeachers = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTeachers(fetchedTeachers);
    } catch (error) {
      console.error("Error fetching teachers:", error);
      Alert.alert("Error", "Failed to fetch teachers");
    }
  };

  const fetchClasses = async () => {
    try {
      const snapshot = await firestore().collection('Class').get();
      const fetchedClasses = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setClasses(fetchedClasses);
    } catch (error) {
      console.error("Error fetching classes:", error);
      Alert.alert("Error", "Failed to fetch classes");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Teachers</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search Teacher by ID (e.g., Teacher1)"
          onSubmitEditing={(e) => handleTeacherSearch(e.nativeEvent.text)}
        />
      </View>
      {selectedTeacher && (
        <>
          <Text style={styles.selectedTeacherText}>Selected Teacher: {selectedTeacher.id}</Text>
          {selectedTeacher.Assigned ? (
            <View style={styles.assignedContainer}>
              <Text style={styles.assignedText}>Assigned Class: {selectedTeacher.classAssigned}</Text>
              <TouchableOpacity style={styles.unassignButton} onPress={handleRemoveClass}>
                <Text style={styles.unassignButtonText}>Unassign Class</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.classListContainer}>
              <Text style={styles.classListHeader}>Select a Class to Assign</Text>
              {classes.map((classItem) => (
                <TouchableOpacity 
                  key={classItem.id} 
                  style={[
                    styles.classListItem, 
                    classAssigned === classItem.id && styles.selectedClass
                  ]}
                  onPress={() => setClassAssigned(classItem.id)}
                >
                  <Text style={styles.classListItemText}>Class ID: {classItem.id}</Text>
                  <Text style={styles.classListItemText}>Teacher Assigned: {classItem.Tid || 'None'}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.assignButton} onPress={handleAssignClass}>
                <Text style={styles.assignButtonText}>Assign Class</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 8,
  },
  selectedTeacherText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  assignedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  assignedText: {
    fontSize: 16,
  },
  unassignButton: {
    backgroundColor: '#E57373',
    padding: 10,
    borderRadius: 5,
  },
  unassignButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  classListContainer: {
    flex: 1,
  },
  classListHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  classListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedClass: {
    backgroundColor: '#d3d3d3',
  },
  classListItemText: {
    flex: 1,
  },
  assignButton: {
    backgroundColor: '#1B6A8B',
    padding: 10,
    borderRadius: 5,
    marginTop: 16,
  },
  assignButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ManageTeachers;