/** React */
import { useEffect, useState, useRef } from "react";

/** library */
import { paper, Path, Tool, Group, CompoundPath } from "paper";

import { offsetUtils } from "@/components/note/CanvasPanel/Utils/offsetUtils";

const eraseArgs = {
  size: 40,
  strokeCap: "round",
  strokeJoin: "round",
  strokeColor: "white",
  name: "erase",
};

const deleteTargetType = ["Group", "Shape", "Raster"];

const EraseTool = ({ canvas }) => {
  const erasePointer = useRef(null);

  const [erasePath, setErasePath] = useState(null);
  const [tmpGroup, setTmpGroup] = useState(null);
  const [mask, setMask] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  /**
   * @function strokeRatio
   * 線の太さを調整するための比率
   */
  const strokeRatio = () => {
    const { pixelRatio } = paper.view;
    return pixelRatio === 2 ? 2 : 1;
  };

  /**
   * @function eraseRadius
   * 消しゴムの半径
   */
  const eraseRadius = () => {
    const { pixelRatio } = paper.view;
    const num = pixelRatio === 2 ? 2 : 1;
    return eraseArgs.size / num;
  };

  const getNewCircle = (point) => {
    return new Path.Circle({
      center: point,
      radius: eraseRadius(),
    });
  };

  const returnObjToActiveLayer = () => {
    paper.project.layers[0].addChildren(tmpGroup.removeChildren());
  };

  /**
   * 線の書き始め
   */
  const drawStart = (e) => {
    const { size, strokeCap, strokeJoin, strokeColor } = eraseArgs;
    const strokeWidth = (size * paper.view.pixelRatio) / strokeRatio;
    setIsDrawing(true);
    console.log(
      paper.project,
      paper.project.layers[0],
      size,
      strokeCap,
      strokeJoin,
      strokeColor
    );

    if (!paper.project.layers.length) {
      return false;
    }

    const copiedActiveLayerChildren = paper.project.layers[0].removeChildren();

    setErasePath(
      new Path({
        strokeWidth,
        strokeCap,
        strokeJoin,
        strokeColor,
      })
    );

    setTmpGroup(
      new Group({
        children: copiedActiveLayerChildren,
        blendMode: "source-out",
      })
    );
    console.log(tmpGroup);

    setMask(
      new Group({
        children: [erasePath, tmpGroup],
        blendMode: "source-over",
      })
    );
  };

  /**
   * 線の書き途中
   */
  const drawing = (e) => {
    if (erasePath) {
      const erasePointerIcon = erasePointer.current;
      erasePointerIcon.style.left = `${e.point.x}px`;
      erasePointerIcon.style.top = `${e.point.y}px`;
      erasePointerIcon.style.transform = "translate(-50%, -50%)";
      erasePath.add(e.point);
    }
  };

  /**
   * 線の書き終わり
   */
  const drawEnd = (e) => {
    if (erasePath) {
      if (paper.project.isEmpty()) {
        return false;
      }

      erasePath.simplify();
      setIsDrawing(false);
      // this._setErasePointerPos(null, null);

      const outerPath = offsetUtils().offsetPath(erasePath, eraseRadius());
      const innerPath = offsetUtils().offsetPath(erasePath, -eraseRadius());

      outerPath.insert = false;
      innerPath.insert = false;
      innerPath.reverse();

      const endCaps = new CompoundPath({
        children: [
          getNewCircle(erasePath.firstSegment.point),
          getNewCircle(erasePath.lastSegment.point),
        ],
        insert: false,
      });

      let deleteShape = new Path({
        closed: true,
        insert: false,
        segments: [...outerPath.segments, ...innerPath.segments],
      });

      deleteShape = deleteShape.unite(endCaps);
      deleteShape.simplify();

      // 消しゴムパスと接触のあった全アイテムを取得する
      // recursiveをtrueにすると子アイテムも精査対象にするが
      // 今回の場合は不要なのでfalseにする
      //
      const touchedItemWithErase = tmpGroup.getItems({
        overlapping: deleteShape.bounds,
        recursive: false,
      });

      touchedItemWithErase.forEach((item) => {
        if (deleteTargetType.includes(item.className)) {
          return false;
        }

        const result = item.subtract(deleteShape, {
          trace: false,
          insert: false,
        });

        if (result.children) {
          item.parent.insertChildren(item.index, result.removeChildren());
          item.remove();
        } else if (result.length === 0) {
          item.remove();
        } else {
          item.replaceWith(result);
        }
      });

      mask.remove();
      setMask(null);
      returnObjToActiveLayer();

      erasePath.remove();
      setErasePath(null);
    }
  };

  useEffect(() => {
    const eraseTool = new Tool({ name: "Erase" });

    eraseTool.on("mousedown", (e) => drawStart(e));
    eraseTool.on("mousedrag", (e) => drawing(e));
    eraseTool.on("mouseup", (e) => drawEnd(e));

    return () => eraseTool.remove();
  }, [erasePath]);

  return (
    <>
      {isDrawing && (
        <div
          className={`block w-20 h-20 rounded-full bg-white border-1 border-gray-100 border-solid absolute`}
          ref={erasePointer}
        ></div>
      )}
    </>
  );
};

export default EraseTool;
