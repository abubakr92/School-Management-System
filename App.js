import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import AdminLogin from './screens/AdminLogin';
import TeacherLogin from './screens/TeacherLogin';
import StudentLogin from './screens/StudentLogin';
import AdminDashboard from './screens/AdminDashboard';
import TeacherDashboard from './screens/TeacherDashboard';
import StudentDashboard from './screens/StudentDashboard';
import ManageTeachers from './screens/ManageTeachers';
import ManageStudents from './screens/ManageStudents';
import ManageFees from './screens/ManageFees';
import ViewReports from './screens/ViewReports';
import UploadTimetable from './screens/UploadTimetable';
import UploadSyllabus from './screens/UploadSyllabus';
import ManageMarks from './screens/ManageMarks';
import ViewMarks from './screens/ViewMarks';
import ViewTimetable from './screens/ViewTimetable';
import ViewFeeStatus from './screens/ViewFeeStatus';
import AddFeeRecord from './screens/AddFeeRecord';
import ViewFeeRecord from './screens/ViewFeeRecord';
import ViewFee from './screens/ViewFee';
import UpdateFeeRecord from './screens/UpdateFeeRecord';
import DeleteFeeRecord from './screens/DeleteFeeRecord';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLogin} />
        <Stack.Screen name="TeacherLogin" component={TeacherLogin} />
        <Stack.Screen name="StudentLogin" component={StudentLogin} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="TeacherDashboard" component={TeacherDashboard} />
        <Stack.Screen name="StudentDashboard" component={StudentDashboard} />
        <Stack.Screen name="ManageTeachers" component={ManageTeachers} />
        <Stack.Screen name="ManageStudents" component={ManageStudents} />
        <Stack.Screen name="ManageFees" component={ManageFees} />
        <Stack.Screen name="ViewReports" component={ViewReports} />
        <Stack.Screen name="UploadTimetable" component={UploadTimetable} />
        <Stack.Screen name="UploadSyllabus" component={UploadSyllabus} />
        <Stack.Screen name="ManageMarks" component={ManageMarks} />
        <Stack.Screen name="ViewMarks" component={ViewMarks} />
        <Stack.Screen name="ViewTimetable" component={ViewTimetable} />
        <Stack.Screen name="ViewFeeStatus" component={ViewFeeStatus} />
        <Stack.Screen name="AddFeeRecord" component={AddFeeRecord} />
        <Stack.Screen name="ViewFeeRecord" component={ViewFeeRecord} />
        <Stack.Screen name="ViewFee" component={ViewFee} />
        <Stack.Screen name="UpdateFeeRecord" component={UpdateFeeRecord} />
        <Stack.Screen name="DeleteFeeRecord" component={DeleteFeeRecord} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
















// import React, { useEffect } from "react";
// import { Button, StyleSheet, Text, View } from "react-native";
// import firestore from '@react-native-firebase/firestore';
// import faker from '@faker-js/faker'; // Import faker library

// const App = () => {
//   useEffect(() => {
//     populateStudents();
//   }, []);

//   const populateStudents = async () => {
//     try {
//       const studentCollection = firestore().collection('Student');
//       const classes = ['Nursery', 'Prep', 'Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6', 'Class 7', 'Class 8'];

//       for (const className of classes) {
//           for (let i = 1; i <= 25; i++) {
//               const student = createRandomStudent(className === 'Nursery' ? 0 : (className === 'Prep' ? 100 : (parseInt(className.split(' ')[1]) - 1) * 25), className, i);
//               try {
//                   await studentCollection.add(student);
//                   console.log(`Student added to ${className}: ${student.regNo}`);
//               } catch (error) {
//                   console.error("Error adding student:", error);
//               }
//           }
//       }

//       console.log('Data population completed');
//     } catch (error) {
//       console.error("Error populating students:", error);
//     }
//   };

//   const createRandomStudent = (regNo, className, index) => {
//     return {
//       regNo: regNo + index,
//       name: faker.person.fullName(),
//       DoA: faker.date.past().toISOString(),
//       DoB: faker.date.birthdate({ min: 4, max: 15 }).toISOString(),
//       gender: faker.person.sexType(),
//       father: {
//         name: faker.person.fullName(),
//         occupation: faker.name.jobTitle(),
//         caste: guessCasteByRegion(),
//         residence: faker.address.streetAddress(),
//       },
//       admissionClass: className,
//       loginCred: {
//         email: faker.internet.email(),
//         password: faker.internet.password(),
//       },
//       remarks: faker.lorem.sentence(),
//     };
//   };

//   const guessCasteByRegion = () => {
//     const castes = ['Jutt', 'Arain', 'Rajput', 'Gujjar', 'Malik', 'Sheikh', 'Soomro', 'Laghari', 'Memon', 'Chandio', 'Khan', 'Yousafzai', 'Khattak', 'Mughal', 'Afridi', 'Tareen', 'Bugti', 'Mengal', 'Raisani', 'Khetran', 'Marri', 'Balti', 'Shina', 'Yashkun', 'Brusho', 'Wakhi'];
//     const randomCaste = castes[Math.floor(Math.random() * castes.length)];
//     return randomCaste;
//   };

//   return (
//     <View style={styles.container}>
//       <Text>Data Population</Text>
//       <Button title="Populate Firestore" onPress={populateStudents} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default App;
