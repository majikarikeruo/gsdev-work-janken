/** React */
import { useEffect, useState } from "react";

/** library */
import { paper, Path, Tool } from "paper";

const PencilTool = () => {
  let pencilPath;

  const pencilArgs = {
    strokeColor: "#000000",
    strokeWidth: 1,
    name: "Pencil",
    minDistance: 2,
  };

  console.log(paper);

  /**
   * 線の書き始め
   */
  const drawStart = (e) => {
    pencilPath = new Path({
      segments: [e.point],
      ...pencilArgs,
    });
  };

  /**
   * 線の書き途中
   */
  const drawing = (e) => {
    if (pencilPath) {
      pencilPath.add(e.point);
    }
  };

  /**
   * 線の書き終わり
   */
  const drawEnd = (e) => {
    if (pencilPath) {
      pencilPath.simplify();
      pencilPath = null;
    }
  };

  useEffect(() => {
    const pencilTool = new Tool({ ...pencilArgs });

    pencilTool.on("mousedown", (e) => drawStart(e));
    pencilTool.on("mousedrag", (e) => drawing(e));
    pencilTool.on("mouseup", (e) => drawEnd(e));

    // return () => pencilTool.remove();
  }, []);

  return null;
};

export default PencilTool;
