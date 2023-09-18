export const chatHref = (userId: string, friendId: string) => {
  const sortedIds = [userId, friendId].sort();
  return `${sortedIds[0]}--${sortedIds[1]}`;
};
