import { Platform } from "react-native";

// Colori principali (web/light)
const primaryLight = "#2563eb";   // blu web (lo stesso che usavi)
const backgroundLight = "#f5f9ff"; // sfondo chiaro web
const textLight = "#11181C";
const cardLight = "#ffffff";

// Colori per dark mode (moderni, leggibili)
const primaryDark = "#58a6ff";    // blu acceso (stile GitHub dark)
const backgroundDark = "#0d1117"; // sfondo quasi nero
const textDark = "#e6edf3";
const cardDark = "#161b22";

export const Colors = {
  light: {
    text: textLight,
    background: backgroundLight,
    card: cardLight,
    tint: primaryLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: primaryLight,
  },
  dark: {
    text: textDark,
    background: backgroundDark,
    card: cardDark,
    tint: primaryDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: primaryDark,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
