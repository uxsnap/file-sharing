"use client";

import CodeForm from "@/components/CodeForm";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
import { AuthType } from "@/types";
import {
  Button,
  Card,
  Flex,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";

type AuthData = {
  type: AuthType;
  payload?: any;
};

export default function Page() {
  const [authData, setAuthData] = useState<AuthData>({
    type: AuthType.LOGIN,
  });

  const theme = useMantineTheme();

  const mainColor = theme.colors.blue[4];

  const handleAuthData = (type: AuthType, payload: any = null) => {
    setAuthData({
      type,
      payload,
    });
  };

  const renderAuth = () => {
    switch (authData.type) {
      case AuthType.LOGIN:
        return <LoginForm onAuthChange={handleAuthData} />;

      case AuthType.REGISTER:
        return <RegisterForm onAuthChange={handleAuthData} />;
      case AuthType.CODE:
        return (
          <CodeForm email={authData.payload} onAuthChange={handleAuthData} />
        );

      case AuthType.FORGOT_PASSWORD:
        return (
          <>
            <TextInput label="Email" />

            <Button mt={12} fullWidth>
              Send
            </Button>

            <Button
              onClick={() => handleAuthData(AuthType.LOGIN)}
              variant="light"
              mt={8}
              fullWidth
            >
              Login
            </Button>
            <Button
              onClick={() => handleAuthData(AuthType.REGISTER)}
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
          <Text fw={500}>{authData.type}</Text>
        </Card.Section>

        <Card.Section p="md">{renderAuth()}</Card.Section>
      </Card>
    </Flex>
  );
}
