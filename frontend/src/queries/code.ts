import { AxiosError } from "axios";
import api from "./api";

export type CodeBody = {
  email: string;
  code: string;
};

const code = async (body: CodeBody) => {
  let response;

  try {
    response = await api.post("/code", body);

    return response;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

code.queryKey = "code";

export default code;
