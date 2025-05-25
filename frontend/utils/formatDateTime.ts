export const formatDateTime = (dateTime: string) => {
  const date = new Date(dateTime);
  const formattedDate = date.toLocaleString(navigator.language);

  return formattedDate;
};
