import { BASE_URL } from "@/config";
import axios from "axios";

const userLogin = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/api/auth/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const registeredUsers = async () => {
  const response = await axios.get(`${BASE_URL}/api/users`);
  return response.data;
};
const registerNewUser = async (details) => {
  const response = await axios.post(`${BASE_URL}/api/auth/register`, details, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export { userLogin, registeredUsers, registerNewUser };
