export const fetchClient = (url: string, config?: RequestInit) => {
  const finalUrl = process.env.NEXT_PUBLIC_API_URL! + url;
  return fetch(finalUrl, config);
};
