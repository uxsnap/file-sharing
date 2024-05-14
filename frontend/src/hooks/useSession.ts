import validate from "@/queries/validate";
import { ErrorResponse } from "@/types";
import { useLocalStorage } from "@mantine/hooks";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function () {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useLocalStorage({
    key: "jwt_token",
    defaultValue: "",
  });

  const { mutate } = useMutation({
    mutationFn: validate,
    onError: (errorResp: ErrorResponse<string>) => {
      notifications.show({
        title: "Validation",
        message: errorResp.error,
      });

      setIsAuth(false);
      setToken("");
    },
    onSuccess: () => {
      setIsAuth(true);
    },
  });

  useEffect(() => {
    token.length && mutate({ token });
  }, [token]);

  return {
    isAuth,
  };
}
