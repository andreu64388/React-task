import axios, { AxiosInstance } from "axios";

const baseURL = process.env.API_SERVER;

const instance: AxiosInstance = axios.create({
  baseURL: baseURL,
});

export default instance;
