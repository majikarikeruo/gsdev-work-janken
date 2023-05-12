/** React */
import { use, useEffect, useState } from "react";

/**
 * Mantine
 */
import { Divider, Flex, Group } from "@mantine/core";

/** library */
import { paper, Path, Tool } from "paper";

/**
 * Icon
 */
import { Pencil, Eraser, TextColor, Lasso } from "tabler-icons-react";
import { IconHighlight } from "@tabler/icons-react";

const ToolIcons = () => {
  const [tool, setTool] = useState("Pencil");

  /**
   * @function toggleTool
   * Toolを切り替えする
   */
  const toggleTool = (e) => {
    const { tools } = paper;

    const targetTool = tools.find((tool) => tool.name === e);

    if (targetTool) {
      targetTool.activate();
      setTool(e);
      console.log(e);
    }
  };

  useEffect(() => {
    // 初期状態ではPencilが選択されるように
    toggleTool("Pencil");

    return () => {};
  }, []);

  return (
    <Group>
      <Pencil
        onClick={() => toggleTool("Pencil")}
        className={tool === "Pencil" ? "bg-gray-300 rounded-full" : ""}
      />
      <IconHighlight />
      <Eraser
        onClick={() => toggleTool("Erase")}
        className={tool === "Erase" ? "bg-gray-300 rounded-full" : ""}
      />
      <TextColor />
      <Lasso />
    </Group>
  );
};

export default ToolIcons;
