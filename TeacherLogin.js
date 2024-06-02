// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';

const TeacherLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 2000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleLogin = async () => {
    try {
      console.log('Fetching all teacher documents');
      const snapshot = await firebase.firestore().collection('Teacher').get();

      if (snapshot.empty) {
        console.log('No teachers found in the collection.');
        setError('Invalid email or password');
        return;
      }

      let validLogin = false;
      snapshot.forEach(doc => {
        const teacherData = doc.data();
        console.log('Checking credentials for document:', doc.id);
        if (teacherData.email === email && teacherData.password === password) {
          validLogin = true;
          console.log('Email and password match. Navigating to TeacherDashboard.');
          navigation.navigate('TeacherDashboard', { teacherId: doc.id });
          setEmail('');
          setPassword('');
          setError('');
        }
      });

      if (!validLogin) {
        console.log('No matching email and password.');
        setError('Invalid email or password');
      }

    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Teacher Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default TeacherLogin;






// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
// import { firebase } from '@react-native-firebase/firestore';

// const TeacherLogin = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async () => {
//     try {
//       console.log('Fetching all teacher documents');
//       const snapshot = await firebase.firestore().collection('Teacher').get();

//       if (snapshot.empty) {
//         console.log('No teachers found in the collection.');
//         setError('Invalid email or password');
//         return;
//       }

//       let validLogin = false;
//       snapshot.forEach(doc => {
//         const teacherData = doc.data();
//         console.log('Checking credentials for document: ${doc.id}');
//         if (teacherData.email === email && teacherData.password === password) {
//           validLogin = true;
//           console.log('Email and password match. Navigating to TeacherDashboard.');
//           navigation.navigate('TeacherDashboard', { teacherId: doc.id });
          
//         }
//       });

//       if (!validLogin) {
//         console.log('No matching email and password.');
//         setError('Invalid email or password');
//       }

//     } catch (error) {
//       console.error('Error during login:', error);
//       setError(error.message);
//     }
//   };




//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Teacher Login</Text>
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         value={password}
//         onChangeText={setPassword}
//         secureTextEntry
//       />
//       <Button title="Login" onPress={handleLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 40,
//     textAlign: 'center',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   error: {
//     color: 'red',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
// });


// export default TeacherLogin;

// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';

// // const TeacherLogin = ({ navigation }) => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleLogin = () => {
// //     // Replace the following with your actual login logic
// //     if (email === 'teacher@example.com' && password === 'password') {
// //       navigation.navigate('TeacherDashboard');
// //     } else {
// //       Alert.alert('Login Failed', 'Invalid email or password');
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <Text style={styles.header}>Teacher Login</Text>
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Email"
// //         value={email}
// //         onChangeText={setEmail}
// //       />
// //       <TextInput
// //         style={styles.input}
// //         placeholder="Password"
// //         secureTextEntry
// //         value={password}
// //         onChangeText={setPassword}
// //       />
// //       <TouchableOpacity style={styles.button} onPress={handleLogin}>
// //         <Text style={styles.buttonText}>Login</Text>
// //       </TouchableOpacity>
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
// //     marginBottom: 40,
// //   },
// //   input: {
// //     width: '80%',
// //     height: 40,
// //     borderColor: '#ccc',
// //     borderWidth: 1,
// //     marginBottom: 20,
// //     paddingLeft: 10,
// //     borderRadius: 5,
// //   },
// //   button: {
// //     width: '80%',
// //     height: 40,
// //     justifyContent: 'center',
// //     alignItems: 'center',
// //     backgroundColor: '#1B6A8B',
// //     borderRadius: 5,
// //   },
// //   buttonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// // });

// // export default TeacherLogin;
