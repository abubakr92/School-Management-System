//This screen was developed by Group Memeber Fatima Batool, Registration Number SP21-BCS-108



import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const AdminDashboard = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageTeachers')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('./images/person.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Manage Teachers</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageStudents')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('./images/person.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Manage Students</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ManageFees')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('./images/fees.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Manage Fees</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ViewFeeStatus')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('./images/view.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>View Fee Status</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UploadTimetable')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('./images/timetable.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Upload Timetable</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('UploadSyllabus')}
        >
          <View style={styles.buttonContent}>
            <Image
              source={require('./images/syllabus.png')}
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Upload Syllabus</Text>
          </View>
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
    marginBottom: 40,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'left',
    backgroundColor: '#1B6A8B',
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 1, 
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 20,
    height: 25, 
    marginRight: 2,
    marginLeft: 4, 
  },
});

export default AdminDashboard;
