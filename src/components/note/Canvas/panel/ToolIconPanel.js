/**
 * Mantine
 */
import { Divider, Flex, Group } from "@mantine/core";

/**
 * Icon
 */
import { Pencil, Eraser, TextColor, Lasso } from "tabler-icons-react";

const ToolIconPanel = ({ tool, setTool }) => {
  const toolIconClick = (e) => {
    setTool(e);
  };

  return (
    <Group>
      <Pencil
        onClick={() => toolIconClick("Pencil")}
        className={tool === "Pencil" ? "bg-gray-300 rounded-full" : ""}
      />

      <Eraser
        onClick={() => toolIconClick("Erase")}
        className={tool === "Erase" ? "bg-gray-300 rounded-full" : ""}
      />
      <TextColor />
      <Lasso
        onClick={() => toolIconClick("Lasso")}
        className={tool === "Lasso" ? "bg-gray-300 rounded-full" : ""}
      />
    </Group>
  );
};

export default ToolIconPanel;
