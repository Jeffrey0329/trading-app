import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';

import { useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme, colors } = useTheme();
  const translateX = useRef(new Animated.Value(theme === 'dark' ? 30 : 0)).current;

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: theme === 'dark' ? 30 : 0,
      useNativeDriver: true,
      friction: 8,
      tension: 40,
    }).start();
  }, [theme]);

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      activeOpacity={0.7}
      style={[
        styles.themeToggle,
        {
          borderColor: colors.text,
          backgroundColor: colors.bgDark,
        }
      ]}
      accessibilityLabel={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      <View style={styles.toggleTrack}>
        <Animated.View
          style={[
            styles.toggleThumb,
            {
              backgroundColor: colors.text,
              transform: [{ translateX }],
            }
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    borderWidth: 2,
    width: 62,
    height: 30,
    borderRadius: 15,
    padding: 0,
    position: 'relative',
    overflow: 'hidden',
  },
  toggleTrack: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    position: 'relative',
  },
  toggleThumb: {
    position: 'absolute',
    top: 3,
    left: 3.5,
    width: 20,
    height: 20,
    borderRadius: 10,
  },
});

export default ThemeToggle;