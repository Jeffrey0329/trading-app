import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../contexts/ThemeContext';

const AuthButton = ({ text, onPress, disabled = false }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors.bgLight }]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 6,
    width: '80%',
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})