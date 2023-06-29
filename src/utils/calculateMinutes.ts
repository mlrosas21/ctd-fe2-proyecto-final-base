export const calculateMinutesAgo = (date: Date): number => {
  const now = new Date();
  const minutesAgo = Math.floor((now.getTime() - date.getTime()) / 60000);
  return minutesAgo;
};
