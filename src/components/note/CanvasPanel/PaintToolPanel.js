/**
 * Mantine
 */
import { Divider, Flex, Group, createStyles } from "@mantine/core";

/**
 * Icons
 */
import {
  IconFilePlus,
  IconArrowBackUp,
  IconArrowForwardUp,
  IconTrash,
  IconDots,
} from "@tabler/icons-react";

/**
 * components
 */
import ToolIcons from "@/components/note/CanvasPanel/ToolIcons";
import ColorPickers from "@/components/note/CanvasPanel/ColorPickers";

/**
 * React
 */
import { useState } from "react";

/** library */
import { paper } from "paper";

const PaintToolPanel = ({ tool, setTool, setColor }) => {
  return (
    <>
      <Flex
        justify="space-between"
        align="center"
        className="bg-[#FCFCFC] p-2 px-4 border-b border-[#EEEEEE] border-solid"
      >
        <Group>
          <ToolIcons tool={tool} setTool={setTool} />

          <Divider orientation="vertical" size={2} color={"black"} />

          <ColorPickers />
        </Group>

        {/*  */}
        <Group>
          <IconArrowBackUp />
          <IconArrowForwardUp />
          <IconFilePlus />
          <IconTrash />
          <IconDots />
        </Group>
        {/*  */}
      </Flex>
    </>
  );
};

export default PaintToolPanel;
