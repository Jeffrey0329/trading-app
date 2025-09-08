import { BackHandler } from 'react-native';
import { ThemeProvider } from '../contexts/ThemeContext';

//hook
import { useState, useEffect } from 'react';
import { Slot, useRouter, useSegments } from 'expo-router';

//service
import { authService } from '../services/authService';

const RootLayout = () => {
  const segments = useSegments();
  const router = useRouter();
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    console.log('🌳 Root Layout Navigation Stack:', segments);
    console.log('🌳 Root Layout Full Path:', segments.join('/'));
  }, [segments]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppReady(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkAuthStatus = async () => {
      if (hasCheckedAuth) return;
      
      try {
        const isLoggedIn = await authService.isLoggedIn();
        console.log('🔐 User login status:', isLoggedIn);
        
        const currentPath = segments.join('/');
        
        if (isLoggedIn) {
          if (!currentPath.startsWith('(tabs)')) {
            console.log('🚀 Redirecting to home page');
            router.navigate('/(tabs)/home');
          } else {
            console.log('✅ Already on tabs page, no redirect needed');
          }
        } else {
          if (currentPath !== '') {
            console.log('🚀 Redirecting to index page');
            router.navigate('/');
          } else {
            console.log('✅ Already on index page, no redirect needed');
          }
        }
      } catch (error) {
        console.error('❌ Auth check failed:', error);
        router.navigate('/');
      } finally {
        setHasCheckedAuth(true);
      }
    };

    checkAuthStatus();
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (segments.length === 0) {
        console.log('📱 Back button pressed on index page - exiting app');
        BackHandler.exitApp();
        return true;
      }
      console.log('📱 Back button pressed - default behavior');
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );

    return () => backHandler.remove();
  }, [segments]);

  if (!isAppReady) {
    return null;
  }

  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  )
}

export default RootLayout