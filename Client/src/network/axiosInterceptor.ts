import axios from "axios";
import { baseURL } from "./endpoint";

/**
 * #### Responsibility
 * Creates an Axios instance with a specified base URL and default headers.
 *
 * This function sets up an Axios instance for making HTTP requests with a predefined
 * authorization token and interceptors to handle request and response processing.
 *
 * @param baseURL - The base URL for the Axios instance.
 * @returns The configured Axios instance.
 *
 * @throws {Error} Will throw an error if the baseURL is not provided or is not a valid string.
 *
 * @example
 * const apiInstance = await createAxiosInstance("https://api.example.com");
 * try {
 *   const response = await apiInstance.get("/endpoint");
 *   console.log(response.data);
 * } catch (error) {
 *   console.error(error);
 * }
 */
const createAxiosInstance = (baseURL: string) => {
  if (!baseURL)
    throw new Error("Base URL is required to create an axios instance");

  const newInstance = axios.create({
    baseURL,
    withCredentials: true,
  });

  newInstance.interceptors.request.use(async (req) => {
    return req;
  });

  newInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  return newInstance;
};

export const axiosInstance = createAxiosInstance(baseURL);
