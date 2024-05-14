import fieldErrorHandle from "./fieldErrorHandle";
import { notifications } from "@mantine/notifications";

import type { ErrorField, ErrorResponse } from "@/types";
import type { UseFormReturnType } from "@mantine/form";

export default function<T>(form: UseFormReturnType<T>, { error }: ErrorResponse<ErrorField[]>) {
  if (typeof error !== "string") {
    return form.setErrors(fieldErrorHandle(error));
  }

  notifications.show({
    title: 'Error',
    message: error,
  })
}