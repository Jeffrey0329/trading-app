import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { Link } from 'expo-router'
import { useTheme } from '../../contexts/ThemeContext';

const Button = ({ link, text }) => {
  const { colors } = useTheme();

  return (
    <Link href={link} style={[styles.button, { backgroundColor: colors.bgLight }]} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
      >
        <Text style={[styles.text, { color: colors.text }]}>{text}</Text>
      </TouchableOpacity>
    </Link>
  )
}

export default Button

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