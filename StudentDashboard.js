// This screen was developed by Group Member:
// Muhammad Armughan Safdar FA21-BCS-050



import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const StudentDashboard = ({ studentId }) => {
  const [feeStatus, setFeeStatus] = useState(null);
  const [syllabus, setSyllabus] = useState(null);
  const [timetable, setTimetable] = useState(null);

  const handleViewFeeStatus = async () => {
    try {
      const studentDoc = await firestore().collection('Student').doc(studentId).get();
      const studentData = studentDoc.data();

      if (studentData.feeStatus) {
        // Display the fee status for the current student
        Alert.alert(`Fee Status: ${studentData.feeStatus}`);
      } else {
        Alert.alert('No fee status found for this student.');
      }
    } catch (error) {
      console.error('Error fetching fee status:', error);
      Alert.alert('Failed to fetch fee status. Please try again.');
    }
  };

  const handleViewSyllabus = async () => {
    try {
      const classDoc = await firestore().collection('Class').doc(studentId).get();
      const classData = classDoc.data();

      if (classData.syllabus) {
        setSyllabus(classData.syllabus);
      } else {
        Alert.alert('No syllabus found.');
      }
    } catch (error) {
      console.error('Error fetching syllabus:', error);
      Alert.alert('Failed to fetch syllabus. Please try again.');
    }
  };

  const handleViewTimetable = async () => {
    try {
      const timetableDoc = await firestore().collection('TimeTable').doc('time').get();
      const timetableData = timetableDoc.data();

      if (timetableData.url) {
        // Toggle the timetable visibility
        setTimetable(timetable === null ? timetableData.url : null);
      } else {
        Alert.alert('No timetable found.');
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);
      Alert.alert('Failed to fetch timetable. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Student Dashboard</Text>
      <TouchableOpacity style={styles.button} onPress={handleViewFeeStatus}>
        <Image source={require('./images/fees.png')} style={styles.icon} />
        <Text style={styles.buttonText}>View Fee Status</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewSyllabus}>
        <Image source={require('./images/syllabus.png')} style={styles.icon} />
        <Text style={styles.buttonText}>View Syllabus</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleViewTimetable}>
        <Image source={require('./images/timetable.png')} style={styles.icon} />
        <Text style={styles.buttonText}>View Timetable</Text>
      </TouchableOpacity>
      {syllabus && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${syllabus}` }}
          style={styles.image}
        />
      )}
      {timetable && (
        <Image
          source={{ uri: `data:image/jpeg;base64,${timetable}` }}
          style={styles.image}
        />
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
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1B6A8B',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    marginTop: 20,
  },
});

export default StudentDashboard;






// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const StudentDashboard = ({ studentId }) => {
//   const [feeStatus, setFeeStatus] = useState(null);
//   const [syllabus, setSyllabus] = useState(null);
//   const [timetable, setTimetable] = useState(null);

//   const handleViewFeeStatus = async () => {
//     try {
//       const studentDoc = await firestore().collection('Student').doc(studentId).get();
//       const studentData = studentDoc.data();

//       if (studentData.feeStatus) {
//         // Display the fee status for the current student
//         Alert.alert(`Fee Status: ${studentData.feeStatus}`);
//       } else {
//         Alert.alert('No fee status found for this student.');
//       }
//     } catch (error) {
//       console.error('Error fetching fee status:', error);
//       Alert.alert('Failed to fetch fee status. Please try again.');
//     }
//   };

//   const handleViewSyllabus = async () => {
//     try {
//       const classDoc = await firestore().collection('Class').doc(studentId).get();
//       const classData = classDoc.data();

//       if (classData.syllabus) {
//         setSyllabus(classData.syllabus);
//       } else {
//         Alert.alert('No syllabus found.');
//       }
//     } catch (error) {
//       console.error('Error fetching syllabus:', error);
//       Alert.alert('Failed to fetch syllabus. Please try again.');
//     }
//   };

//   const handleViewTimetable = async () => {
//     try {
//       const timetableDoc = await firestore().collection('TimeTable').doc('time').get();
//       const timetableData = timetableDoc.data();

//       if (timetableData.url) {
//         setTimetable(timetableData.url);
//       } else {
//         Alert.alert('No timetable found.');
//       }
//     } catch (error) {
//       console.error('Error fetching timetable:', error);
//       Alert.alert('Failed to fetch timetable. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Student Dashboard</Text>
//       <TouchableOpacity style={styles.button} onPress={handleViewFeeStatus}>
//         <Text style={styles.buttonText}>View Fee Status</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleViewSyllabus}>
//         <Text style={styles.buttonText}>View Syllabus</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.button} onPress={handleViewTimetable}>
//         <Text style={styles.buttonText}>View Timetable</Text>
//       </TouchableOpacity>
//       {syllabus && (
//         <Image
//           source={{ uri: `data:image/jpeg;base64,${syllabus}` }}
//           style={styles.image}
//         />
//       )}
//       {timetable && (
//         <Image
//           source={{ uri: `data:image/jpeg;base64,${timetable}` }}
//           style={styles.image}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#1B6A8B',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     resizeMode: 'cover',
//     marginTop: 20,
//   },
// });

// export default StudentDashboard;







// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { firebase } from '@react-native-firebase/firestore';

// const StudentDashboard = ({ studentId }) => {
//   const [feeStatus, setFeeStatus] = useState(null);

//   const handleViewFeeStatus = async () => {
//     try {
//       const studentDoc = await firebase.firestore().collection('Student').doc(studentId).get();
//       const studentData = studentDoc.data();

//       if (studentData.feeStatus) {
//         // Display the fee status for the current student
//         Alert.alert('Fee Status, ${studentData.feeStatus}');
//       } else {
//         Alert.alert('No fee status found for this student.');
//       }
//     } catch (error) {
//       console.error('Error fetching fee status:', error);
//       Alert.alert('Failed to fetch fee status. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Student Dashboard</Text>
//       <TouchableOpacity style={styles.button} onPress={handleViewFeeStatus}>
//         <Text style={styles.buttonText}>View Fee Status</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#1B6A8B',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default StudentDashboard;


// // import React from 'react';
// // import { View, Text, Button, StyleSheet } from 'react-native';
// // import { firebase } from '@react-native-firebase/firestore';

// // const StudentDashboard = ({ route, navigation }) => {
// //   const { studentId } = route.params;

// //   const handleViewFeeStatus = async () => {
// //     try {
// //       const studentDoc = await firebase.firestore().collection('Student').doc(studentId).get();
// //       const studentData = studentDoc.data();

// //       if (studentData.feeStatus) {
// //         // Display the fee status for the current student
// //         alert(Fee Status: ${studentData.feeStatus});
// //       } else {
// //         alert('No fee status found for this student.');
// //       }
// //     } catch (error) {
// //       console.error('Error fetching fee status:', error);
// //       alert('Failed to fetch fee status. Please try again.');
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Student Dashboard</Text>
// //       <View style={styles.buttonContainer}>
// //         <Button title="View Marks" onPress={() => alert('View Marks button pressed')} />
// //         <Button title="View Fee Status" onPress={handleViewFeeStatus} />
// //         <Button title="View TimeTable" onPress={() => alert('View TimeTable button pressed')} />
// //         <Button title="View Syllabus" onPress={() => alert('View Syllabus button pressed')} />
// //       </View>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#fff',
// //   },
// //   header: {
// //     fontSize: 24,
// //     fontWeight: 'bold',
// //     marginBottom: 20,
// //   },
// //   buttonContainer: {
// //     width: '80%',
// //     marginTop: 20,
// //   },
// // });

// // export default StudentDashboard;


// // // import React from 'react';
// // // import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// // // const StudentDashboard = ({ navigation }) => {
// // //   return (
// // //     <View style={styles.container}>
// // //       <Text style={styles.header}>Student Dashboard</Text>
// // //       <View style={styles.buttonContainer}>
// // //         <TouchableOpacity
// // //           style={styles.button}
// // //           onPress={() => navigation.navigate('ViewMarks')}
// // //         >
// // //           <View style={styles.buttonContent}>
// // //             <Image source={require('./images/marks.png')} style={styles.buttonIcon} />
// // //             <Text style={styles.buttonText}>View Marks</Text>
// // //           </View>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity
// // //           style={styles.button}
// // //           onPress={() => navigation.navigate('ViewFeeStatus')}
// // //         >
// // //           <View style={styles.buttonContent}>
// // //             <Image source={require('./images/fees.png')} style={styles.buttonIcon} />
// // //             <Text style={styles.buttonText}>View Fee Status</Text>
// // //           </View>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity
// // //           style={styles.button}
// // //           onPress={() => navigation.navigate('ViewTimetable')}
// // //         >
// // //           <View style={styles.buttonContent}>
// // //             <Image source={require('./images/timetable.png')} style={styles.buttonIcon} />
// // //             <Text style={styles.buttonText}>View Timetable</Text>
// // //           </View>
// // //         </TouchableOpacity>
// // //         <TouchableOpacity
// // //           style={styles.button}
// // //           onPress={() => navigation.navigate('ViewSyllabus')}
// // //         >
// // //           <View style={styles.buttonContent}>
// // //             <Image source={require('./images/syllabus.png')} style={styles.buttonIcon} />
// // //             <Text style={styles.buttonText}>View Syllabus</Text>
// // //           </View>
// // //         </TouchableOpacity>
        
// // //       </View>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#fff',
// // //   },
// // //   header: {
// // //     fontSize: 24,
// // //     fontWeight: 'bold',
// // //     marginBottom: 40,
// // //   },
// // //   buttonContainer: {
// // //     alignItems: 'center',
// // //   },
// // //   button: {
// // //     width: 150,
// // //     height: 100,
// // //     justifyContent: 'center',
// // //     alignItems: 'center',
// // //     backgroundColor: '#1B6A8B',
// // //     borderRadius: 10,
// // //     marginBottom: 20,
// // //     marginHorizontal: 20,
// // //   },
// // //   buttonContent: {
// // //     alignItems: 'center',
// // //   },
// // //   buttonIcon: {
// // //     width: 50,
// // //     height: 50,
// // //     marginBottom: 10,
// // //   },
// // //   buttonText: {
// // //     color: '#fff',
// // //     fontSize: 18,
// // //     fontWeight: 'bold',
// // //   },
// // // });

// // // export default StudentDashboard;

//abubakars

// import React, { useState } from 'react';
// import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { firebase } from '@react-native-firebase/firestore';

// const StudentDashboard = ({ studentId }) => {
//   const [feeStatus, setFeeStatus] = useState(null);

//   const handleViewFeeStatus = async () => {
//     try {
//       const studentDoc = await firebase.firestore().collection('Student').doc(studentId).get();
//       const studentData = studentDoc.data();

//       if (studentData.feeStatus) {
//         // Display the fee status for the current student
//         Alert.alert('Fee Status, ${studentData.feeStatus}');
//       } else {
//         Alert.alert('No fee status found for this student.');
//       }
//     } catch (error) {
//       console.error('Error fetching fee status:', error);
//       Alert.alert('Failed to fetch fee status. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Student Dashboard</Text>
//       <TouchableOpacity style={styles.button} onPress={handleViewFeeStatus}>
//         <Text style={styles.buttonText}>View Fee Status</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#1B6A8B',
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default StudentDashboard;