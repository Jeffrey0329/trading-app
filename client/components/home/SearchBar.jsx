import { StyleSheet, View, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { useTheme } from '../../contexts/ThemeContext';

const SearchBar = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.bgLight }]}>
      <Ionicons name="search" size={20} color={colors.textMuted} />
      <TextInput
        placeholder="Search..."
        placeholderTextColor={colors.textMuted}
        style={[styles.searchInput, { color: colors.text }]}
      />
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    borderRadius: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
})