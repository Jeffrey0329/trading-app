import { StyleSheet, Text, View } from 'react-native'

import { useTheme } from '../../contexts/ThemeContext'

const Logo = () => {
  const { colors } = useTheme()

  return (
    <View style={styles.logoContainer}>
      <Text style={[styles.logoText, { color: colors.text }]}>
        TradeX
      </Text>
      <Text style={[styles.logoSubtitle, { color: colors.textMuted }]}>
        Marketplace 🚀
      </Text>
    </View>
  )
}

export default Logo

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  logoSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
})