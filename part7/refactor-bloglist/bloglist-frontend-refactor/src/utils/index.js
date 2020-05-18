export const activeStyle = {
  color: "blue",
  fontWeight: "bold",
  textDecoration: "underline",
};

export const renderIcons = () => {
  const icons = ["🐙", "🍋", "🐠", "🐳", "🦁"];
  const idx = Math.floor(Math.random() * icons.length);
  return icons[idx];
};
