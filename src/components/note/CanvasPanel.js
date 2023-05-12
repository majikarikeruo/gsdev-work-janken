/** React */
import { useEffect, useState } from "react";

/** library */
import { paper } from "paper";

/**
 * components
 */
import PaintToolPanel from "@/components/note/CanvasPanel/PaintToolPanel";
import PencilTool from "@/components/note/CanvasPanel/Tool/PencilTool";
import EraseTool from "@/components/note/CanvasPanel/Tool/EraseTool";

const Canvas = () => {
  // const [canvas, setCanvas] = useState(null);
  // const [tool, setTool] = useState("Pencil");
  // const [color, setColor] = useState("#000000");

  useEffect(() => {
    paper.setup("canvas");
    // Paper.jsが読み込まれたcanvasのサイズを親のHTML要素いっぱいにする
  }, []);

  return (
    <div className="h-screen relative pt-[44px]">
      <PencilTool />
      <EraseTool />
      <div className="absolute top-0 left-0 w-full">
        <PaintToolPanel />
      </div>
      <div>
        <canvas
          id="canvas"
          className="w-full h-full"
          width=""
          height=""
          resize="true"
        ></canvas>
      </div>
    </div>
  );
};
export default Canvas;
