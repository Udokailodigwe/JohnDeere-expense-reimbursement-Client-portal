import axios from "axios";
import { getUserFromLocalStorage } from "./localStorage";

const customFetch = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

customFetch.interceptors.request.use((config) => {
  const user = getUserFromLocalStorage();
  if (user) {
    const parsedUser = JSON.parse(user);
    config.headers["Authorization"] = `Bearer ${parsedUser.token}`;
  }
  return config;
});

export default customFetch;
