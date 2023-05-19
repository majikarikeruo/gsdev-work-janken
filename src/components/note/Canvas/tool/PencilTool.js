/** React */
import { useEffect, useState, useContext } from "react";

/** library */
import { paper, Path, Tool } from "paper";

/** useHooks */
// import useIndexedDB from "@/components/commons/hooks/useIndexedDB";
// import useHistories from "@/components/commons/hooks/useHistories";

/** Context */
import HistoryContext from "@/components/commons/context/HistoryContext";
import IndexedDBContext from "@/components/commons/context/IndexedDBContext";

const PencilTool = ({ color, width }) => {
  const [pencilPath, setPencilPath] = useState(null);
  const { db, addDataToIndexedDB, getAllHistory } =
    useContext(IndexedDBContext); //関数コンポーネント直下で呼び出さないとエラーになる

  const { historyIndex, historyGoBack, historyGoForward } =
    useContext(HistoryContext);

  const pencilArgs = {
    strokeColor: color,
    strokeWidth: width,
    name: "Pencil",
    minDistance: 2,
  };

  const pencilTool = new Tool();

  /**
   * 線の書き始め
   */
  const drawStart = (e) => {
    const newPencilPath = new Path({
      segments: [e.point],
      ...pencilArgs,
    });
    setPencilPath(newPencilPath);
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
  const drawEnd = async (e) => {
    if (pencilPath) {
      pencilPath.simplify();
      setPencilPath(null);

      /*
       * indexedDBにデータを追加
       */
      const jsonData = paper.project.exportJSON();
      await addDataToIndexedDB(jsonData);
      await historyGoForward();
    }
  };

  pencilTool.on("mousedown", (e) => drawStart(e));
  pencilTool.on("mousedrag", (e) => drawing(e));
  pencilTool.on("mouseup", (e) => drawEnd(e));
  pencilTool.activate();

  return null;
};

export default PencilTool;
