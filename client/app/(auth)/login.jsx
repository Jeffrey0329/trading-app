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

const LoginScreen = () => {
  const colors = useColors();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const result = await authService.login(formData.email, formData.password);
      
      if (result.success) {
        router.replace('/home');
      } else {
        Alert.alert('Error', result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgDark }]}>
      <Text style={[styles.header, { color: colors.text }]}>Login to Your Account</Text>
      <Spacer height={30} />

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
      <Spacer height={5} />

      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={{ color: '#007AFF' }}>
          Forgot Password?
        </Text>
      </TouchableOpacity>
      <Spacer height={15} />
        
      <AuthButton text={loading ? 'Signing in...' : 'Sign in'} onPress={handleLogin} disabled={loading} />

      <View style={styles.registerContainer}>
        <Text style={{ color: colors.textMuted }}>
          Don't have an account? 
        </Text>
        <Link href="/register" asChild>
          <TouchableOpacity>
            <Text style={{ color: '#007AFF', marginLeft: 5 }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginRight: '10%',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
})