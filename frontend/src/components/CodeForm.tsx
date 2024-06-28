import { AuthType, ErrorField, ErrorResponse } from "@/types";
import handleAuthError from "@/utils/handleAuthError";
import { Button, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import code from "@/queries/code";

type Props = {
  onAuthChange: (newAuthType: AuthType) => void;
  email: string;
};

const CodeForm = ({ onAuthChange, email }: Props) => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      code: "",
    },
    validate: {
      // TODO: Validate code on frontend
      code: (value) => (value.length === 5 ? null : "Invalid code"),
    },
  });

  const { mutate } = useMutation({
    mutationFn: code,
    onError: (errorResp: ErrorResponse<ErrorField[]>) => {
      handleAuthError(form, errorResp);
    },
    onSuccess: () => {
      notifications.show({
        title: "Verification code",
        message: "Successfully has been logged",
      });

      onAuthChange(AuthType.LOGIN);
    },
  });

  const onSubmit = form.onSubmit((values) => mutate({ ...values, email }));

  return (
    <form onSubmit={onSubmit}>
      <TextInput
        label="Code"
        placeholder="Input code"
        {...form.getInputProps("code")}
      />

      <Button type="submit" mt={12} fullWidth>
        Send code
      </Button>
    </form>
  );
};

export default CodeForm;
