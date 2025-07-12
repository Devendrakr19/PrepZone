export const getToken = () => localStorage.getItem("token");

export const getConfig = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    withCredentials: true,
  };
};