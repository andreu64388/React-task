import axios, { AxiosInstance } from "axios";

const baseURL = process.env.API_SERVER;

const instance: AxiosInstance = axios.create({
  baseURL: "https://nest-task-production.up.railway.app/api",
});

export default instance;
