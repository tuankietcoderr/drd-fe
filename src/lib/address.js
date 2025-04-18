export const getVietnamCities = async () => {
  const res = await fetch('https://provinces.open-api.vn/api/?depth=1', {
    cache: 'force-cache',
  });
  if (!res.ok) {
    return [];
  }
  const data = await res.json();
  return data;
};
