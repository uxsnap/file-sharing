import { AxiosError } from "axios";
import api from "./api";

export type LoginBody = {
  email: string;
  password: string;
};

const login = async (body: LoginBody) => {
  let response;

  try {
    response = await api.post("/login", body);

    return response.data;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

login.queryKey = "login";

export default login;
