import { getThemeColors } from '../constants/Color';
import { useTheme } from '../contexts/ThemeContext';

export const useColors = () => {
  const { theme } = useTheme();
  return getThemeColors(theme);
};