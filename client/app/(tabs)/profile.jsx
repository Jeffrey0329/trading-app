import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

//component
import Spacer from '../../components/Spacer'
import Avater from '../../components/profile/Avater'
import ProfileButton from '../../components/profile/ProfileButton'
import StatItem from '../../components/profile/StatItem';
import ProfileMenuList from '../../components/profile/ProfileMenuList'

//hook
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useColors } from '../../hooks/useColor';

//service
import { authService } from '../../services/authService';
import api from '../../services/api';
import { API_ENDPOINTS } from '../../constants/Api';

const ProfileScreen = () => {
  const colors = useColors();
  const router = useRouter();

  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { icon: 'list', label: 'My Listing' },
    { icon: 'cart', label: 'My Purchases' },
    { icon: 'cash', label: 'My Sales' },
    { icon: 'heart', label: 'Favorites' },
    { icon: 'wallet', label: 'Wallet' },
    { icon: 'star', label: 'Rating' },
    { icon: 'help-circle', label: 'Customer Support' },
  ];

  const stateItems = [
    { number: '0', label: 'Selling', showSeparator: true },
    { number: '0', label: 'Sold', showSeparator: true },
    { number: '0', label: 'Rating', showSeparator: false },
  ];

  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get(API_ENDPOINTS.USER_PROFILE);
      
      if (response.data.success) {
        setUserProfile(response.data.data.user);
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
      Alert.alert('Error', 'Unable to fetch user profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('/');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Logout failed');
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: colors.bgDark }}>
      <TouchableOpacity style={styles.setting}>
        <Ionicons name="settings" size={24} color={colors.text} />
      </TouchableOpacity>
      <Spacer height={40} /> 

      {userProfile ? (
        <>
          <View style={styles.profileHeader}>
            <Avater user={userProfile} />
            <View>
              <Text style={[styles.username, { color: colors.text }]}>{userProfile.username}</Text>
              <Text style={[styles.email, { color: colors.text }]}>{userProfile.email}</Text>
              <Text style={[styles.bio, { color: colors.textMuted }]}>{userProfile.bio || 'No bio yet'}</Text>
            </View>
          </View>
          <Spacer height={20} /> 

          <View style={styles.profileButton}>
            <ProfileButton text="Edit Profile" />
            <ProfileButton text="Log out" onPress={handleLogout} />
          </View>
          <Spacer height={20} /> 

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ backgroundColor: colors.bgLight, height: '100%'}}>
              <Spacer height={20} /> 
              <View style={[styles.statsContainer, { backgroundColor: colors.bg }]}>
                {stateItems.map((item, index) => (
                  <StatItem 
                    key={index}
                    number={item.number}
                    label={item.label}
                    showSeparator={item.showSeparator}
                  />
                ))}
              </View>
              <Spacer height={20} /> 
              
              <View style={[styles.menuContainer, { backgroundColor: colors.bg }]}>
                {menuItems.map((item, index) => (
                  <ProfileMenuList 
                    key={index}
                    icon={item.icon}
                    label={item.label}
                    isLastItem={index === menuItems.length - 1}
                  />
                ))}
              </View>
              <Spacer height={200} /> 
            </View>
          </ScrollView>
        </>
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: colors.text }}>Loading user profile...</Text>
        </View>
      )}
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  setting: {
    position: 'absolute',
    top: 60, 
    right: 20,
    zIndex: 10,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly', 
  },
  username: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  email: {
    textAlign: 'center',
    fontSize: 14,
    marginBottom: 10,
  },
  bio: {
    textAlign: 'center',
    fontSize: 14,
  },
  profileButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
  },
  menuContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
})