export const createQueryString = (searchParams, key, value) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return `?${params.toString()}`;
};
