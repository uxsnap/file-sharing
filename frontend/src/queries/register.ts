import { AxiosError } from "axios";
import api from "./api";

export type RegisterBody = {
  name: string;
  email: string;
  password: string;
};

const register = async (body: RegisterBody) => {
  let response;

  try {
    response = await api.post('/register', body);

    return response;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
}

register.queryKey = "register"; 

export default register;