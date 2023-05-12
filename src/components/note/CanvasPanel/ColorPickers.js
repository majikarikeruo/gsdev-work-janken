/**
 * React
 */
import { useEffect, useState } from "react";

/**
 * Mantine
 */
import { Group } from "@mantine/core";

/** library */
import { paper } from "paper";

/**
 * components
 */
import ColorPicker from "@/components/note/CanvasPanel/ColorPicker";

const ColorPickers = () => {
  //   const [tool, setTool] = useState("Pencil");

  /**
   * @function toggleColor
   * Toolを切り替えする
   */
  const toggleColor = (color) => {
    const { tools } = paper;

    const pencilTool = tools.find((tool) => tool.name === "Pencil");
    console.log(color, pencilTool);
    if (pencilTool) {
      pencilTool.strokeColor = color;
      pencilTool.strokeWidth = 1;
      pencilTool.minDistance = 2;
    }
  };

  return (
    <Group>
      <ColorPicker color={"#000000"} toggleColor={toggleColor} />
      <ColorPicker color={"#ff0000"} toggleColor={toggleColor} />
      <ColorPicker color={"#0000ff"} toggleColor={toggleColor} />
      {/* <ColorPicker color={"#0000ff"} toggleColor={} onClick={() => toggleColor("#0000ff")} /> */}
    </Group>
  );
};

export default ColorPickers;
