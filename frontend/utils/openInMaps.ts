export const goToMapsUrl = (e: any, address: string) => {
  e.stopPropagation(); // Prevent the Link click
  e.preventDefault();
  const url = `http://maps.google.com/?q=${address}`;

  window.open(url, "_blank");
};
