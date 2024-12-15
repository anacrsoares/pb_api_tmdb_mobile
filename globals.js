import { StyleSheet } from "react-native";

const COLORS = {
  darkBackground: "#242424",
  lightBlackFont: "#505040",
  yellowBackground: "#fcff39",
  goldenYellowStars: "#f3c600",
  darkBackgroundCards: "#8b0404",
  darkFont: "#000",
  lightFontRed: "#ffcccc",
  lightFontDefault: "#fffbe8",
  darkShadowBox: "#333",
  lightShadowBox: "#888",
};

const FONTS = {
  fontLogo: "Audiowide",
  defaultFont: "Michroma",
};

const globals = StyleSheet.create({
  body: {
    color: COLORS.lightBlackFont,
    overflowX: "hidden", // No React Native, isso não é necessário.
  },
  homeWrapper: {
    backgroundColor: COLORS.yellowBackground,
  },
  input: {
    fontFamily: FONTS.defaultFont,
    fontWeight: "bold",
  },
  placeholder: {
    color: COLORS.lightFontRed,
  },
});

export { COLORS, FONTS, globals };
