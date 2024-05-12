import { ErrorField } from "@/types";

export default function (errors: ErrorField[]) {
  return errors.reduce((res, curError) => {
    res[curError.field.toLowerCase()] = curError.message;
    
    return res;
  }, {} as Record<string, string>);
}
