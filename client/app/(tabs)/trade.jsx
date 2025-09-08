import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//hook
import { useColors } from '../../hooks/useColor';

const TradeScreen = () => {
  const colors = useColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgDark }]}>
      <Text>Trade</Text>
    </SafeAreaView>
  )
}

export default TradeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})