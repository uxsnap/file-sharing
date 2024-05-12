import register from "@/queries/register";
import { AuthType, ErrorField, ErrorResponse } from "@/types";
import fieldErrorHandle from "@/utils/fieldErrorHandle";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";

type Props = {
  onAuthChange: (newAuthType: AuthType) => void;
};

const RegisterForm = ({ onAuthChange }: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const { mutate } = useMutation({
    mutationFn: register,
    onError: ({ error }: ErrorResponse<ErrorField[]>) => {
      if (typeof error !== "string") {
        return form.setErrors(fieldErrorHandle(error));
      }

      notifications.show({
        title: 'Error',
        message: error,
      })
    },
    onSuccess: () => {
      console.log("registered");
    },
  });

  const onSubmit = form.onSubmit((values) => mutate(values));

  return (
    <form onSubmit={onSubmit}>
      <TextInput label="Login" {...form.getInputProps("name")} />
      <TextInput label="Email" mt={12} {...form.getInputProps("email")} />
      <TextInput
        label="Password"
        type="password"
        mt={12}
        {...form.getInputProps("password")}
      />

      <Button type="submit" mt={12} fullWidth>
        Register
      </Button>

      <Button
        onClick={() => onAuthChange(AuthType.LOGIN)}
        variant="light"
        mt={8}
        fullWidth
      >
        Login
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

export default RegisterForm;
