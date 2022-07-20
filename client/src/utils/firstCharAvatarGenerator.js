export const firstCharAvatarGenerator = (value) => {
  const link = `https://ui-avatars.com/api/?name=${value[0]}&background=random&color=random`;

  return link;
};