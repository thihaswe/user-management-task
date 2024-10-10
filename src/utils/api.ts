import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

export const fetchUsers = async (
  limit: number,
  skip: number,
  sortBy: string,
  order: string
) => {
  const response = await axios.get(
    sortBy && order
      ? `${BASE_URL}?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`
      : `${BASE_URL}?limit=${limit}&skip=${skip}`
  );
  return response.data;
};

export const fetchUserDetail = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response.data;
};
