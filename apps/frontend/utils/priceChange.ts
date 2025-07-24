export const calculatePriceChange = (price?: number, oldPrice?: number) => {
  if (!oldPrice) return undefined;

  return ((price! - oldPrice) / oldPrice) * 100;
};
