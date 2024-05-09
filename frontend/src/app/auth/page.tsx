"use client";

import {
  Button,
  Card,
  Flex,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

enum AuthType {
  LOGIN = "Login",
  REGISTER = "Register",
  FORGOT_PASSWORD = "Forgot Password",
}

export default function Page() {
  const [authType, setAuthType] = useState(AuthType.LOGIN);

  const theme = useMantineTheme();

  const mainColor = theme.colors.blue[4];

  const renderAuth = () => {
    switch (authType) {
      case AuthType.LOGIN:
        return (
          <>
            <TextInput label="Login/Email" />
            <TextInput type="password" mt={12} label="Password" />

            <Button mt={12} fullWidth>
              Login
            </Button>

            <Button
              onClick={() => setAuthType(AuthType.REGISTER)}
              variant="light"
              mt={8}
              fullWidth
            >
              Register
            </Button>
            <Button
              onClick={() => setAuthType(AuthType.FORGOT_PASSWORD)}
              variant="light"
              mt={8}
              fullWidth
            >
              Forgot Password
            </Button>
          </>
        );

      case AuthType.REGISTER:
        return (
          <>
            <TextInput label="Login" />
            <TextInput label="Email" mt={12} />
            <TextInput label="Password" type="password" mt={12} />

            <Button mt={12} fullWidth>
              Register
            </Button>

            <Button
              onClick={() => setAuthType(AuthType.LOGIN)}
              variant="light"
              mt={8}
              fullWidth
            >
              Login
            </Button>
            <Button
              onClick={() => setAuthType(AuthType.FORGOT_PASSWORD)}
              variant="light"
              mt={8}
              fullWidth
            >
              Forgot Password
            </Button>
          </>
        );

      case AuthType.FORGOT_PASSWORD:
        return (
          <>
            <TextInput label="Email" />

            <Button mt={12} fullWidth>
              Send
            </Button>

            <Button
              onClick={() => setAuthType(AuthType.LOGIN)}
              variant="light"
              mt={8}
              fullWidth
            >
              Login
            </Button>
            <Button
              onClick={() => setAuthType(AuthType.REGISTER)}
              variant="light"
              mt={8}
              fullWidth
            >
              Register
            </Button>
          </>
        );
      default:
        return <></>;
    }
  };

  return (
    <Flex align="center" justify="center" w="100%" h="100%" bg={mainColor}>
      <Card miw={350} shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section withBorder inheritPadding py="xs">
          <Text fw={500}>{authType}</Text>
        </Card.Section>

        <Card.Section p="md">{renderAuth()}</Card.Section>
      </Card>
    </Flex>
  );
}
