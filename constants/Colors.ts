const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
const primary = "#ff9f1C";
const secondary = "#ffbf69";
const tertiary = "#2ec4b6";
const quaternary = "#cbf3f0";
const white = "#fff";
const black = "#000";
const grey = "#ccc";

export default {
  light: {
    text: black,
    background: white,
    textBackground: "#eee",
    tint: tintColorLight,
    tabIconDefault: grey,
    tabIconSelected: primary,
    selectedColor: "#888",
    primary: primary,
    secondary: secondary,
    tertiary: tertiary,
    quaternary: quaternary,
  },
  dark: {
    text: white,
    background: black,
    textBackground: "#333",
    tint: tintColorDark,
    tabIconDefault: grey,
    tabIconSelected: secondary,
    selectedColor: white,
    primary: primary,
    secondary: secondary,
    tertiary: tertiary,
    quaternary: quaternary,
  },
};
