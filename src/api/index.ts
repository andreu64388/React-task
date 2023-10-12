import axios, { AxiosInstance } from "axios";

const baseURL = "https://nest-task-production.up.railway.app/api";

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default instance;
