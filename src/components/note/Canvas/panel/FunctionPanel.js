/**
 * Mantine
 */
import { Group } from "@mantine/core";

/**
 * React
 */
import { useState } from "react";

/**
 * Icons
 */
import { IconBallpenOff, IconTrash, IconDots } from "@tabler/icons-react";

/** library */
import { paper } from "paper";

/**
 * Components
 */
import HistoryPanel from "@/components/note/Canvas/panel/HistoryPanel";

const FunctionPanel = ({}) => {
  const showConfirmDialog = () => {
    const permitAllPencilPath = window.confirm(
      "書き込みを全てクリアします。よろしいですか？"
    );

    if (permitAllPencilPath) {
      paper.project.activeLayer.removeChildren();
    }
  };

  return (
    <Group>
      <HistoryPanel />
      <IconBallpenOff onClick={() => showConfirmDialog()} />
      {/* <IconFilePlus /> */}
      {/* <IconTrash /> */}
      <IconDots />
    </Group>
  );
};

export default FunctionPanel;
