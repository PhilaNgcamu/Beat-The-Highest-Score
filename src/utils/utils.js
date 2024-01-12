export const calculateDistance = (pos1, pos2) => {
  const distanceX = pos1.left - pos2.left;
  const distanceY = pos1.top - pos2.top;
  return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
};

export const randomizePosition = (boardSize) => {
  return Math.floor(Math.random() * Math.floor(boardSize / 30)) * 30;
};
