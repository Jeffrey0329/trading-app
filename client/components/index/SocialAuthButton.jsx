import { StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Link } from 'expo-router'
import { useTheme } from '../../contexts/ThemeContext';

const SocialAuthButton = ({ link, icon }) => {
  const { colors } = useTheme();
  
  return (
    <Link href={link} style={[styles.button, { backgroundColor: colors.bgLight }]} asChild>
      <TouchableOpacity
        activeOpacity={0.7}
      >
        <MaterialCommunityIcons 
          style={[styles.icon, { color: colors.text }]}
          name={icon} 
        />
      </TouchableOpacity>
    </Link>
  )
}

export default SocialAuthButton

const styles = StyleSheet.create({
  button: {
    padding: 15,
    borderRadius: 50,
  },
  icon: {
    fontSize: 25
  },
})