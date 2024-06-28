import login from "@/queries/login";
import {
  AuthType,
  ErrorField,
  ErrorResponse,
  LoginErrorResponse,
  TokenResponse,
} from "@/types";
import handleAuthError from "@/utils/handleAuthError";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@mantine/hooks";

type Props = {
  onAuthChange: (newAuthType: AuthType, payload?: any) => void;
};

const LoginForm = ({ onAuthChange }: Props) => {
  const [_, setToken] = useLocalStorage({
    key: "jwt_token",
    defaultValue: "",
  });

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const { mutate } = useMutation({
    mutationFn: login,
    onError: (errorResp: LoginErrorResponse<ErrorField[]>) => {
      handleAuthError(form, errorResp);

      if (!errorResp.is_active) {
        onAuthChange(AuthType.CODE, form.getValues().email);
      }
    },
    onSuccess: (data: TokenResponse) => {
      setToken(data.token);

      notifications.show({
        title: "Login",
        message: "Successfully has been logged",
      });
    },
  });

  const onSubmit = form.onSubmit((values) => mutate(values));

  return (
    <form onSubmit={onSubmit}>
      <TextInput label="Email" {...form.getInputProps("email")} />
      <TextInput
        type="password"
        mt={12}
        label="Password"
        {...form.getInputProps("password")}
      />

      <Button type="submit" mt={12} fullWidth>
        Login
      </Button>

      <Button
        onClick={() => onAuthChange(AuthType.REGISTER)}
        variant="light"
        mt={8}
        fullWidth
      >
        Register
      </Button>
      <Button
        onClick={() => onAuthChange(AuthType.FORGOT_PASSWORD)}
        variant="light"
        mt={8}
        fullWidth
      >
        Forgot Password
      </Button>
    </form>
  );
};

export default LoginForm;
