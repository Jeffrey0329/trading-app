import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//component
import Spacer from '../../components/Spacer'
import AuthButton from '../../components/auth/AuthButton'

//hook
import { useState } from 'react';
import { Link, useRouter } from 'expo-router';
import { useColors } from '../../hooks/useColor';

//service
import { authService } from '../../services/authService';

const RegisterScreen = () => {
  const colors = useColors();
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!formData.username || !formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (formData.password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.register(formData);
      
      if (result.success) {
        router.replace('/home');
      } else {
        Alert.alert('Error', result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      Alert.alert('Error', error.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgDark }]}>
      <Text style={[styles.header, { color: colors.text }]}>Register A New Account</Text>
      <Spacer height={30} />

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Username
        </Text>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.bgLight,
              color: colors.text,
            }
          ]}
          placeholder="Enter your username"
          placeholderTextColor={colors.textMuted}
          value={formData.username}
          onChangeText={(text) => setFormData({ ...formData, username: text })}
          autoCapitalize="none"
        />
      </View>
      <Spacer height={20} />

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Email Address
        </Text>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.bgLight,
              color: colors.text,
            }
          ]}
          placeholder="Enter your email"
          placeholderTextColor={colors.textMuted}
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Spacer height={20} />

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Password
        </Text>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.bgLight,
              color: colors.text,
            }
          ]}
          placeholder="Enter your password"
          placeholderTextColor={colors.textMuted}
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          secureTextEntry
        />
      </View>
      <Spacer height={20} />

      <View style={styles.inputContainer}>
        <Text style={[styles.label, { color: colors.text }]}>
          Confirm Password
        </Text>
        <TextInput
          style={[
            styles.input, 
            { 
              backgroundColor: colors.bgLight,
              color: colors.text,
            }
          ]}
          placeholder="Confirm your password"
          placeholderTextColor={colors.textMuted}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      </View>
      <Spacer height={20} />
        
      <AuthButton text={loading ? 'Signing up...' : 'Sign up'} onPress={handleRegister} disabled={loading} />

      <View style={styles.loginContainer}>
        <Text style={{ color: colors.textMuted }}>
          Already have an account? 
        </Text>
        <Link href="/login" asChild>
          <TouchableOpacity>
            <Text style={{ color: '#007AFF', marginLeft: 5 }}>
              Sign In
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    padding: 15,
    borderRadius: 6,
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})