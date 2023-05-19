/**
 * Mantine
 */
import { Divider, Flex, Group, ActionIcon, ColorPicker } from "@mantine/core";

/**
 * Icons
 */
import { IconChevronDown } from "@tabler/icons-react";

import { Circle } from "tabler-icons-react";

/**
 * components
 */
import ToolIconPanel from "@/components/note/Canvas/panel/ToolIconPanel";
import FunctionPanel from "@/components/note/Canvas/panel/FunctionPanel";
import ColorPickIcon from "@/components/note/Canvas/icon/ColorPickIcon";
import LineIcon from "@/components/note/Canvas/icon/LineIcon";
import ErasePointer from "@/components/note/Canvas/ui/ErasePointer";

/**
 * React
 */
import { useState } from "react";

/** library */
import { paper } from "paper";

const PaintToolPanel = ({
  color,
  width,
  eraseWidth,
  tool,
  setTool,
  setColor,
  setWidth,
  setEraseWidth,
}) => {
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleChange = (color) => {
    setColor(color);
  };

  return (
    <>
      <Group>
        <ToolIconPanel tool={tool} setTool={setTool} />

        <Divider orientation="vertical" size={2} color={"black"} />

        {tool === "Pencil" && (
          <>
            <Group>
              {["#000000", "#ff0000", "#0000ff"].map((targetColor, index) => (
                <ColorPickIcon
                  key={index}
                  color={color}
                  targetColor={targetColor}
                  setColor={setColor}
                />
              ))}

              <ActionIcon className="relative" color="white">
                <Circle
                  color={color}
                  fill={color}
                  radius="xl"
                  size={24}
                  className={`bg-[${color}]`}
                  onClick={() => setDisplayColorPicker(true)}
                />
              </ActionIcon>

              {displayColorPicker && (
                <div className="relative">
                  <ColorPicker
                    withPicker={true}
                    className="absolute top-0 left-0 z-30"
                    format="rgba"
                    value={color}
                    onChange={handleChange}
                  />
                  <div
                    className="w-full h-full z-10 fixed top-0 left-0"
                    onClick={() => setDisplayColorPicker(false)}
                  ></div>
                </div>
              )}
            </Group>
            <Group>
              {[1, 3, 5].map((lineWidth, index) => (
                <LineIcon
                  key={index}
                  width={width}
                  strokeWidth={lineWidth}
                  setWidth={setWidth}
                />
              ))}
            </Group>
          </>
        )}

        {tool === "Erase" && (
          <Group className="flex-shrink-0">
            {[10, 20, 40].map((lineWidth, index) => (
              <ErasePointer
                eraseWidth={eraseWidth}
                eraseSize={lineWidth}
                setEraseWidth={setEraseWidth}
                key={index}
              />
            ))}
          </Group>
        )}
      </Group>
    </>
  );
};

export default PaintToolPanel;
