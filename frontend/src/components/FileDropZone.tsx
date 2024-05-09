import { Group, Text } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import "@mantine/dropzone/styles.css";
import { FaFileCode } from "react-icons/fa";

type Props = {
  color: string;
};

const FileDropZone = ({ color }: Props) => (
  <Dropzone
  display="flex"
    onDrop={(files) => console.log("accepted files", files)}
    onReject={(files) => console.log("rejected files", files)}
    maxSize={5 * 1024 ** 2}
  >
    <Group
      align="center"
      justify="center"
      h="100%"
      w="100%"
      style={{ pointerEvents: "none" }}
    >
      <Dropzone.Accept>
        <FaFileCode size={24} color={color} />
      </Dropzone.Accept>

      <Dropzone.Reject>
        <FaFileCode size={24} color={color} />
      </Dropzone.Reject>

      <Dropzone.Idle>
        <FaFileCode size={24} color={color} />
      </Dropzone.Idle>

      <div>
        <Text size="xl" inline>
          Select files
        </Text>
        <Text size="sm" c="dimmed" inline mt={7}>
          Attach as many files as you like, each file should not exceed 5mb
        </Text>
      </div>
    </Group>
  </Dropzone>
);

export default FileDropZone;
