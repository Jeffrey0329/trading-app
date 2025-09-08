import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../contexts/ThemeContext';

const Products = ({ image, category, name, rating, price }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity style={styles.productCard}>
      <Image source={{ uri: image }} style={styles.productImage} />
              
      <View style={[styles.productInfo, { backgroundColor: colors.bgDark }]}>
        <TouchableOpacity style={styles.heartIcon}>
          <Ionicons name="heart-outline" size={20} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.productCategory, { color: colors.textMuted }]}>{category}</Text>
        <Text style={[styles.productName, { color: colors.text }]}>{name}</Text>
                
        <View style={styles.productFooter}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#FFD700" />
            <Text style={[styles.ratingText, { color: colors.textMuted }]}>{rating}</Text>
          </View>
          <Text style={[styles.productPrice, { color: colors.text }]}>{price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default Products

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 6,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 6,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-around',
    padding: 10,
  },
  productCategory: {
    fontSize: 12,
    marginBottom: 4,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})