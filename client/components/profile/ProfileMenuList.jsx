import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../contexts/ThemeContext';

const ProfileMenuList = ({ icon, label, isLastItem }) => {
  const { colors } = useTheme();

  return (
    <>  
      <TouchableOpacity 
        style={styles.menuItem}
        activeOpacity={0.7}
      >
        <Ionicons name={icon} size={20} color={colors.text} />
        <Text style={[styles.menuLabel, { color: colors.text }]}>{label}</Text>
        <Ionicons name="chevron-forward" size={20} color={colors.text} />
      </TouchableOpacity>
      <View style={{
        borderBottomColor: colors.textMuted,
        borderBottomWidth: isLastItem ? 0 : 1
      }} />
    </>
  )
}

export default ProfileMenuList

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    marginLeft: 12,
  },
})