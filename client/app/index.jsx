import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

//component
import Spacer from '../components/Spacer'
import Logo from '../components/index/Logo'
import Button from '../components/index/Button'
import SocialAuthButton from '../components/index/SocialAuthButton'

//hook
import { useColors } from '../hooks/useColor';

const HomeScreen = () => {
  const colors = useColors();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.bgDark }]}>
      <Logo />
      <Spacer height={30} />

      <Text style={[styles.header, { color: colors.text }]}>Your Gateway to Markets</Text>
      <Spacer height={20} />

      <Button link="/login" text="Login" />
      <Button link="/register" text="Register" />
      <Spacer height={20} />

      <View style={styles.socialButtonsRow}>
        <SocialAuthButton link="/" icon="google" />
        <SocialAuthButton link="/" icon="facebook" />
        <SocialAuthButton link="/" icon="apple" />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

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
  socialButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
})