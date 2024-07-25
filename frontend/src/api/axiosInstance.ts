import axios from "axios";

export interface ErrorResponse {
  detail: string;
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
});

export default axiosInstance;
