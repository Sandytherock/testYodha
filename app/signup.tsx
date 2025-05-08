import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'SignUp'>;
};

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null); // null for placeholder
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onChangeDate = (_event: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) setBirthDate(selectedDate);
  };

  // Format date as DD/MM/YYYY
  const formatDate = (date: Date) => {
    return date
      ? `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`
      : '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        

        {/* Title */}
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.rowCenter}>
          <Text style={styles.subText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
        </View>

        {/* Name Inputs */}
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>

        {/* Email */}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* Birth Date */}
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: birthDate ? '#000' : '#888' }}>
              {birthDate ? formatDate(birthDate) : 'Birth Date'}
            </Text>
            <Image
              source={{ uri: 'https://img.icons8.com/ios-filled/24/000000/calendar.png' }}
              style={styles.iconRight}
            />
          </View>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={birthDate || new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
            maximumDate={new Date()}
          />
        )}

        {/* Phone Number */}
        <View style={styles.row}>
          <View
            style={[
              styles.input,
              {
                flex: 0.3,
                marginRight: 8,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              },
            ]}
          >
            <Text style={{ fontSize: 16 }}>+91</Text>
          </View>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>

        {/* Password */}
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Set Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
            <Image
              source={{
                uri: showPassword
                  ? 'https://img.icons8.com/ios-filled/24/000000/visible.png'
                  : 'https://img.icons8.com/ios-filled/24/000000/closed-eye.png',
              }}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.eyeBtn}
          >
            <Image
              source={{
                uri: showConfirmPassword
                  ? 'https://img.icons8.com/ios-filled/24/000000/visible.png'
                  : 'https://img.icons8.com/ios-filled/24/000000/closed-eye.png',
              }}
              style={styles.iconRight}
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerBtnText}>Register</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 24, paddingTop: 10 },
  backBtn: { marginBottom: 10 },
  backArrow: { fontSize: 26, color: '#222' },
  title: { fontSize: 32, fontWeight: 'bold', alignSelf: 'center', marginBottom: 4, marginTop: 30 },
  rowCenter: { flexDirection: 'row', justifyContent: 'center', marginBottom: 18 },
  subText: { color: '#888', fontSize: 14 },
  linkText: { color: '#2563eb', fontWeight: 'bold', fontSize: 14 },
  row: { flexDirection: 'row', marginBottom: 12 },
  input: {
    backgroundColor: '#fafbfc',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  eyeBtn: {
    position: 'absolute',
    right: 16,
    top: 12,
    padding: 4,
  },
  iconRight: { width: 22, height: 22, tintColor: '#888' },
  registerBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  registerBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default SignUpScreen;
