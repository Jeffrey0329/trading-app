import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../contexts/ThemeContext';

const StatItem = ({ number, label, showSeparator = true }) => {
  const { colors } = useTheme()

  return (
    <>
      <View style={styles.statItem}>
        <Text style={[styles.statNumber, { color: colors.text }]}>{number}</Text>
        <Text style={[styles.statLabel, { color: colors.text }]}>{label}</Text>
      </View>
      {showSeparator && (
        <View style={[styles.separator, { borderRightColor: colors.text }]} />
      )}
    </>
  )
}

export default StatItem

const styles = StyleSheet.create({
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  separator: {
    borderRightWidth: 1,
    marginHorizontal: 8,
  },
})