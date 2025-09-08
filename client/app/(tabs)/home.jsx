import { StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, ImageBackground, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons';

//component
import Spacer from '../../components/Spacer';
import SearchBar from '../../components/home/SearchBar';
import Categories from '../../components/home/Categories';
import Products from '../../components/home/Products';

import ThemeToggle from '../../components/ThemeToggle';

//hook
import { useFocusEffect } from '@react-navigation/native'
import { useCallback } from 'react'
import { useColors } from '../../hooks/useColor';

const HomeScreen = () => {
  const colors = useColors();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        onBackPress
      );

      return () => backHandler.remove();
    }, [])
  );

  const categories = [
    { id: 1, name: 'Electronics', icon: 'phone-portrait' },
    { id: 2, name: 'Clothing', icon: 'shirt' },
    { id: 3, name: 'Furniture', icon: 'bed' },
    { id: 4, name: 'Sports', icon: 'basketball' },
    { id: 5, name: 'Books', icon: 'book' },
    { id: 6, name: 'Food', icon: 'restaurant' },
  ];

  const products = [
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: '$299', 
      rating: '4.8', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop' 
    },
    { 
      id: 2, 
      name: 'Sports Shoes', 
      category: 'Clothing', 
      price: '$199', 
      rating: '4.5', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop' 
    },
    { 
      id: 3, 
      name: 'Coffee Table', 
      category: 'Furniture', 
      price: '$399', 
      rating: '4.7', 
      image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=150&h=150&fit=crop' 
    },
    { 
      id: 4, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: '$249', 
      rating: '4.9', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' 
    },
    { 
      id: 5, 
      name: 'Wireless Headphones', 
      category: 'Electronics', 
      price: '$299', 
      rating: '4.8', 
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop' 
    },
    { 
      id: 6, 
      name: 'Sports Shoes', 
      category: 'Clothing', 
      price: '$199', 
      rating: '4.5', 
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop' 
    },
    { 
      id: 7, 
      name: 'Coffee Table', 
      category: 'Furniture', 
      price: '$399', 
      rating: '4.7', 
      image: 'https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=150&h=150&fit=crop' 
    },
    { 
      id: 8, 
      name: 'Smart Watch', 
      category: 'Electronics', 
      price: '$249', 
      rating: '4.9', 
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop' 
    },
  ];

  return (
    <SafeAreaView style={{ backgroundColor: colors.bgDark }}>
      <View style={styles.headerSection}>
        <SearchBar />
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="cart-outline" size={24} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* <ThemeToggle /> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground 
          source={require('../../assets/background.jpg')}
          style={styles.backgroundImage}
        > 
          <View style={[styles.backgroundOverlay, { backgroundColor: colors.backgroundImage }]}>
            <Text style={[styles.promoTitle, { color: colors.text }]}>🎉 Special Promotion</Text>
            <Text style={[styles.promoText, { color: colors.text }]}>20% OFF</Text>

            <Spacer height={20} />
            <TouchableOpacity 
              style={[styles.promoButton, { backgroundColor: colors.text }]}
              activeOpacity={0.7}
            >
              <Text style={[styles.buttonText, { color: colors.bgDark }]}>Check this out</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Spacer height={20} />

        <View style={styles.section}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((item, index) => (
              <Categories
                key={item.id}
                icon={item.icon}
                name={item.name}
                isLastItem={index === categories.length - 1}
              />
            ))}
          </ScrollView>
        </View>
        <Spacer height={20} />

        <View style={{ paddingHorizontal: 10, height: '100%', backgroundColor: colors.bgLight }}>
          <Spacer height={14} />
          <Text style={[styles.sectionTitle, { paddingHorizontal: 6, color: colors.text }]}>Popular Products</Text>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <Products 
                image={item.image}
                category={item.category}
                name={item.name}
                rating={item.rating}
                price={item.price}
              />
            )}
            keyExtractor={item => item.id.toString()}
            numColumns={2}
            maxToRenderPerBatch={8}
            windowSize={5} 
            removeClippedSubviews={true}
            scrollEnabled={false}
          />
        </View>
        <Spacer height={40} />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,  
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  backgroundImage: {
    height: 200,
  },
  backgroundOverlay: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  promoText: {
    fontSize: 30,
  },
  promoButton: { 
    width: '40%',
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})