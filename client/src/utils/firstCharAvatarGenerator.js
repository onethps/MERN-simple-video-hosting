export const colors = [
  '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00',
  '#607D8B', '#546E7A', '#455A64', '#37474F', '#263238',
  '#2196F3', '#1E88E5', '#1976D2', '#1565C0', '#0D47A1',
  '#795548', '#6D4C41', '#5D4037', '#4E342E', '#3E2723',
  '#00BCD4', '#00ACC1', '#0097A7', '#00838F', '#006064',
  '#FF5722', '#F4511E', '#E64A19', '#D84315', '#BF360C',
  '#673AB7', '#5E35B1', '#512DA8', '#4527A0', '#311B92',
  '#4CAF50', '#43A047', '#388E3C', '#2E7D32', '#1B5E20',
  '#9E9E9E', '#757575', '#616161', '#424242', '#212121',
  '#3F51B5', '#3949AB', '#303F9F', '#283593', '#1A237E',
  '#03A9F4', '#039BE5', '#0288D1', '#0277BD', '#01579B',
  '#8BC34A', '#7CB342', '#689F38', '#558B2F', '#33691E',
  '#CDDC39', '#C0CA33', '#AFB42B', '#9E9D24', '#827717',
  '#FF9800', '#FB8C00', '#F57C00', '#EF6C00', '#E65100',
  '#E91E63', '#D81B60', '#C2185B', '#AD1457', '#880E4F',
  '#9C27B0', '#8E24AA', '#7B1FA2', '#6A1B9A', '#4A148C',
  '#F44336', '#E53935', '#D32F2F', '#C62828', '#B71C1C',
  '#009688', '#00897B', '#00796B', '#00695C', '#004D40',
  '#FFEB3B', '#FDD835', '#FBC02D', '#F9A825', '#F57F17'
]

export const firstCharAvatarGenerator = (value) => {
  const randomColor = Math.floor(Math.random() * colors.length);
  const firstChar = value[0]
  const currentColor = colors[randomColor].substring(1)
  return `https://ui-avatars.com/api/?name=${firstChar}&background=${currentColor}&color=FFFFFF`;
};

