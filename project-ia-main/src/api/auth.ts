import axios from "axios";


export const login = async (name: string, password: string) => {
  try {
    const response = await axios.post(`/api/login`, {
      name,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to login. Please check your credentials.");
  }
};


