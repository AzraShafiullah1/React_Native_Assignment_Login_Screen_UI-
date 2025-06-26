import React, { useState } from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import usersData from '../data/users.json'; // JSON mock data

Dimensions.get('window');

const LoginScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const isValidEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email || !password) {
      return Alert.alert('Error', 'Please fill in all fields.');
    }

    if (!isValidEmail(email)) {
      return Alert.alert('Error', 'Please enter a valid email.');
    }

    const user = usersData.users.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      Alert.alert('Login Successful', `Welcome, ${user.email}`);
    } else {
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  const handleRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/topVector.png')} style={styles.topImage} />

      <Text style={styles.helloText}>Hello</Text>
      <Text style={styles.signInText}>Sign in to your account</Text>

      <View style={styles.inputContainer}>
        <FontAwesome name="user" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <Fontisto name="locked" size={24} color="#9A9A9A" style={styles.inputIcon} />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <FontAwesome
            name={showPassword ? 'eye-slash' : 'eye'}
            size={20}
            color="#9A9A9A"
            style={{ marginRight: 15 }}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.forgotPasswordText}>Forgot your password?</Text>

      {/* ✅ Working Sign In Button */}
      <TouchableOpacity onPress={handleLogin} style={styles.signInButtonContainer}>
  <Text style={styles.signIn}>Sign in</Text>
  <LinearGradient colors={['#F97794', '#623AA2']} style={styles.linearGradient}>
    <AntDesign name="arrowright" size={24} color="white" />
  </LinearGradient>
</TouchableOpacity>
      <TouchableOpacity onPress={handleRegister}>
        <Text style={styles.footerText}>
          Don't have an account?{' '}
          <Text style={{ textDecorationLine: 'underline' }}>Create</Text>
        </Text>
      </TouchableOpacity>

      <ImageBackground
        source={require('../assets/leftVector.png')}
        style={styles.leftVectorImage}
      />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    paddingHorizontal: 20,
  },
  topImage: {
    width: '100%',
    height: 200,
  },
  helloText: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: '500',
    color: '#262626',
  },
  signInText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#262626',
  },
  inputContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    borderRadius: 20,
    marginVertical: 15,
    elevation: 5,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
  },
  inputIcon: {
    marginHorizontal: 10,
  },
  textInput: {
    flex: 1,
  },
  forgotPasswordText: {
    color: '#9A9A9A',
    textAlign: 'right',
    fontSize: 15,
    marginTop: 5,
  },
  signInButtonContainer: {
    flexDirection: 'row',
    marginTop: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  signIn: {
    color: '#262626',
    fontSize: 25,
    fontWeight: 'bold',
  },
  linearGradient: {
    height: 34,
    width: 55,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  footerText: {
    color: '#262626',
    textAlign: 'center',
    fontSize: 15,
    marginTop: 40,
  },
  leftVectorImage: {
    height: 150,
    width: 120,
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});
