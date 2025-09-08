import { StyleSheet, Text, TouchableOpacity } from 'react-native'

import { useTheme } from '../../contexts/ThemeContext';

const ProfileButton = ({ text, onPress }) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.button, { backgroundColor: colors.bgLight }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, {color: colors.text }]}>{text}</Text>
    </TouchableOpacity>
  )
}

export default ProfileButton

const styles = StyleSheet.create({
  button: {
    width: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: '1%',
    padding: 12,
    borderRadius: 12,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
})