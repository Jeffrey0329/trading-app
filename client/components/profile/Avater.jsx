import { StyleSheet, View, Image, Text } from 'react-native';

import { useTheme } from '../../contexts/ThemeContext';

const Avatar = ({ user }) => {
  const { colors } = useTheme();

  if (user?.avatar_url) {
    return (
      <Image 
        source={{ uri: user.avatar_url }}
        style={styles.avatar}
      />
    )
  }

  const initial = user?.username ? user.username.charAt(0).toUpperCase() : '?';
  
  return (
    <View style={[styles.avatar, { backgroundColor: colors.bgLight }]}>
      <Text style={[styles.initialText, { color: colors.textMuted }]}>
        {initial}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: 100, 
    height: 100, 
    borderRadius: 50,
  },
  initialText: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 40,
  },
});

export default Avatar;