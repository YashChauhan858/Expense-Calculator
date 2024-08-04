import { axiosInstance } from "../axiosInterceptor";
import { endpoint } from "../endpoint";

export const getAllExpenses = async () => {
  try {
    const data = await axiosInstance.get(endpoint.getAllExpenses);
    return data?.data;
  } catch (error) {
    return error;
  }
};
