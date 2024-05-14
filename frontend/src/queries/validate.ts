import { AxiosError } from "axios";
import api from "./api";

const validate = async (data: { token: string }) => {
  let response;

  try {
    response = await api.post("/validate", data);

    return response;
  } catch (error) {
    throw (error as AxiosError).response?.data;
  }
};

validate.queryKey = "validate";

export default validate;
