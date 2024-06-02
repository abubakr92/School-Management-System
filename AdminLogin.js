// This screen was developed by Group Members:
// Muhammad Abubakr Siddeeq FA21-BCS-046


import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { firebase } from '@react-native-firebase/firestore';

const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = async () => {
    try {
      const adminDoc = await firebase.firestore().collection('Admin').doc('SuperAdmin').get();
      if (adminDoc.exists) {
        const adminData = adminDoc.data();
        if (adminData.email === email && adminData.password === password) {
      
          setLoginSuccess(true);
  
          setError('');

          setEmail('');
          setPassword('');
     
          navigation.navigate('AdminDashboard');
       
          setTimeout(() => {
            setLoginSuccess(false);
          }, 2000);
        } else {
          setError('Invalid email or password');
        }
      } else {
        setError('Admin not found');
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Login</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      {loginSuccess ? <Text style={styles.success}>Login successful!</Text> : null}
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
  success: {
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AdminLogin;
