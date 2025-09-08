import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../contexts/ThemeContext';

const Categories = ({ icon, name, isLastItem }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity 
      style={[
        styles.categoryItem, 
        { 
          backgroundColor: colors.bgLight,
          marginRight: isLastItem ? 0 : 12
        }
      ]}
    >
      <Ionicons name={icon} size={24} color={colors.text} />
      <Text style={[styles.categoryName, { color: colors.text }]}>{name}</Text>
    </TouchableOpacity>
  )
}

export default Categories

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    minWidth: 80,
  },
  categoryName: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'center',
  },
})