import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';

//hook
import { useColors } from '../../hooks/useColor';

const TabsLayout = () => {
  const colors = useColors();

  return (
    <Tabs 
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: colors.bgDark,
          paddingTop: 10,
        }
      }}
    >
      <Tabs.Screen 
        name='home'
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons 
              name={focused ? "home" : "home-outline"} 
              size={size} 
              color={focused ? colors.text : colors.textMuted}

            />
          )
        }} 
      />

      <Tabs.Screen
        name='trade'
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons 
              name={focused ? "cart" : "cart-outline"} 
              size={size} 
              color={focused ? colors.text : colors.textMuted}
            />
          )
        }} 
      />
      
      <Tabs.Screen 
        name='profile'
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Ionicons 
              name={focused ? "person" : "person-outline"} 
              size={size} 
              color={focused ? colors.text : colors.textMuted}
            />
          )
        }} 
      />
    </Tabs>
  )
}

export default TabsLayout