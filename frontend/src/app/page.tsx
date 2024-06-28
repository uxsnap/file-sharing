"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { FaUser, FaFileCode } from "react-icons/fa";
import { AppShell, Button, Flex, useMantineTheme, Text } from "@mantine/core";

import "@mantine/core/styles.css";
import FileItem from "@/components/FileItem";
import Search from "@/components/Search";
import FileDropZone from "@/components/FileDropZone";
import { useLocalStorage } from "@mantine/hooks";

export default function Home() {
  const theme = useMantineTheme();
  const router = useRouter();

  const [_, setToken] = useLocalStorage({
    key: "jwt_token",
    defaultValue: "",
  });

  const mainColor = theme.colors.blue[4];

  const logout = () => {
    setToken("");
    router.push("/auth");
  };

  return (
    <AppShell header={{ height: 60 }} padding="sm">
      <AppShell.Header pl={12} pr={12}>
        <Flex h="100%" align="center" justify="space-between">
          <Flex align="center" gap={8}>
            <Link style={{ color: mainColor, display: "flex" }} href="/">
              <FaFileCode size={30} />
            </Link>

            <Text
              c="blue"
              fw={900}
              variant="gradient"
              fs="italic"
              gradient={{ from: "cyan", to: "blue", deg: 91 }}
            >
              FILE SHARING
            </Text>
          </Flex>

          <Flex h="100%" align="center" justify="flex-end" gap={12}>
            <Search />
            <Button variant="light">
              <Flex align="center" gap={8}>
                <FaUser size={24} color={mainColor} />
                <Text fw="700">UserName</Text>
              </Flex>
            </Button>
            <Button onClick={logout} color="yellow" variant="light">
              Logout
            </Button>
          </Flex>
        </Flex>
      </AppShell.Header>

      <AppShell.Main w="100%">
        <Flex h="100%" w="100%" wrap="wrap" gap={12}>
          <FileDropZone color={theme.colors.gray[4]} />

          {Array.from({ length: 20 }, (_, ind) => (
            <FileItem color={theme.colors.blue[8]} key={ind} />
          ))}
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
