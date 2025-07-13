import { create } from "zustand";
import { THEMES } from "../components/constants/index";

let theme = localStorage.getItem("chat-theme");
if (!THEMES.includes(theme)) {
  theme = "coffee";
  localStorage.setItem("chat-theme", theme);
}
document.documentElement.setAttribute("data-theme", theme);

export const useThemeStore = create((set) => ({
  theme,
  setTheme: (newTheme) => {
    if (THEMES.includes(newTheme)) {
      localStorage.setItem("chat-theme", newTheme);
      document.documentElement.setAttribute("data-theme", newTheme);
      set({ theme: newTheme });
    }
  },
}));
