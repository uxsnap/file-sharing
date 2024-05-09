import { useState } from "react";
import { FaFileCode, FaPen, FaTimes } from "react-icons/fa";
import { HiDotsVertical } from "react-icons/hi";
import { BsThreeDots } from "react-icons/bs";
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Menu,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";

type Props = {
  color: string;
  onDelete?: () => void;
};

const FileItem = ({ color, onDelete }: Props) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section withBorder inheritPadding py="xs">
        <Group gap={8} align="center">
          <FaFileCode size={24} color={color} />
          {isEditing ? (
            <TextInput fw={500} value="File name" />
          ) : (
            <Text fw={500}>File name</Text>
          )}
        </Group>
      </Card.Section>

      <Box w={300} mt="sm">
        {isEditing ? (
          <Textarea
            value="FILE DESCRIPTION FILE DESCRIPTION FILE DESCRIPTION"
            placeholder="Update description value..."
          />
        ) : (
          <Text pt={6} p={12} lineClamp={3} c="dimmed" size="sm">
            FILE DESCRIPTION FILE DESCRIPTION FILE DESCRIPTION
          </Text>
        )}
      </Box>

      <Flex align="center" w="100%" mt={12} gap={8}>
        <Button
          onClick={() => setIsEditing(!isEditing)}
          fullWidth
          variant="light"
        >
          Edit
        </Button>
        <Button fullWidth variant="light">
          Load
        </Button>
        <Button fullWidth variant="light" c="red">
          Delete
        </Button>
      </Flex>
    </Card>
  );
};

export default FileItem;
