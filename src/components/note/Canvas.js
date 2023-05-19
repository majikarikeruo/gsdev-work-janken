/** React */
import { useEffect, useState } from "react";

/** library */
import { paper } from "paper";

/**
 * Mantine
 */
import { Flex } from "@mantine/core";

/**
 * components
 */
import PaintToolPanel from "@/components/note/Canvas/panel/PaintToolPanel";
import FunctionPanel from "@/components/note/Canvas/panel/FunctionPanel";
import PencilTool from "@/components/note/Canvas/tool/PencilTool";
import EraseTool from "@/components/note/Canvas/tool/EraseTool";
import LassoTool from "@/components/note/Canvas/tool/LassoTool";

import HistoryProvider from "@/components/commons/context/historyProvider";
import IndexedDBProvider from "@/components/commons/context/IndexedDBProvider";

const Canvas = () => {
  const [tool, setTool] = useState("Pencil");
  const [color, setColor] = useState("#000000");
  const [width, setWidth] = useState(1);

  const [eraseWidth, setEraseWidth] = useState(10);

  useEffect(() => {
    paper.setup("canvas");
    // Paper.jsが読み込まれたcanvasのサイズを親のHTML要素いっぱいにする
  }, []);

  return (
    <HistoryProvider>
      <IndexedDBProvider>
        <div className="h-screen overflow-y-scroll relative">
          <Flex
            justify="space-between"
            align="center"
            className="bg-[#FCFCFC] h-[56px] p-2 px-4 border-b border-[#EEEEEE] border-solid"
          >
            <PaintToolPanel
              tool={tool}
              color={color}
              width={width}
              eraseWidth={eraseWidth}
              setTool={setTool}
              setColor={setColor}
              setWidth={setWidth}
              setEraseWidth={setEraseWidth}
            />
            <FunctionPanel />
          </Flex>

          <div className="relative">
            <canvas
              id="canvas"
              className="w-full h-full"
              width=""
              height=""
              resize="true"
            ></canvas>

            {tool === "Pencil" && <PencilTool color={color} width={width} />}
            {tool === "Erase" && <EraseTool eraseWidth={eraseWidth} />}
            {tool === "Lasso" && <LassoTool />}
          </div>
        </div>
      </IndexedDBProvider>
    </HistoryProvider>
  );
};
export default Canvas;
