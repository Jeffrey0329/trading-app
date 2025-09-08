export const darkColors = {
  bgDark: 'hsl(0, 0%, 0%)',      // --bg-dark
  bg: 'hsl(0, 0%, 5%)',          // --bg
  bgLight: 'hsl(0, 0%, 10%)',    // --bg-light
  text: 'hsl(0, 0%, 95%)',       // --text
  textMuted: 'hsl(0, 0%, 70%)',  // --text-muted
  backgroundImage: 'rgba(0, 0, 0, 0.5)', // --bg-image
};

export const lightColors = {
  bgDark: 'hsl(0, 0%, 100%)',     // light --bg-dark
  bg: 'hsl(0, 0%, 95%)',         // light --bg
  bgLight: 'hsl(0, 0%, 90%)',   // light --bg-light
  text: 'hsl(0, 0%, 5%)',        // light --text
  textMuted: 'hsl(0, 0%, 30%)',  // light --text-muted
  backgroundImage: 'rgba(255, 255, 255, 0.5)', // light --bg-image
};

export const getThemeColors = (theme) => {
  return theme === 'dark' ? darkColors : lightColors;
};

export const Colors = {
  dark: darkColors,
  light: lightColors,
};

export default Colors;