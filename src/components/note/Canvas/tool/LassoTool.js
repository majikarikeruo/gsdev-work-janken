/** React */
import { useEffect, useState, useRef } from "react";

/** library */
import { paper, Path, Tool, Point } from "paper";
import { isMobile, isTablet } from "react-device-detect";

import { IconSquareRoundedX } from "@tabler/icons-react";

import PaperItem from "@/components/note/Canvas/utils/PaperItem";

const LassoTool = ({}) => {
  const deleteBtn = useRef(null);

  /**
   * useState
   */
  const [lassoPath, setLassoPath] = useState(null);
  const [lassoDraggable, setLassoDraggable] = useState(false);
  const [lassoState, setLassoState] = useState("empty");
  const [isSelected, setIsSelected] = useState(false);

  isSelected;
  const lassoArgs = {
    strokeWidth: 1,
    dashOffset: 1,
    dashArray: [10, 4],
    strokeCap: "round",
    strokeColor: "#000000",
    name: "Lasso",
    center: null,
  };

  /**
   * 投げなわパスの新規作成
   */
  const _initLassoPath = (event) => {
    const { offsetX, offsetY } = _setLassoStartPoint(event);
    const startLassoPoint = new Point(offsetX, offsetY);
    const lassoPath = new Path({
      segments: [startLassoPoint],
      ...lassoArgs,
    });
    return lassoPath;
  };

  /**
   * 投げなわの開始座標をセット
   */
  const _setLassoStartPoint = (event) => {
    let offsetX, offsetY;

    if (isMobile || isTablet) {
      const rect = event.target.getBoundingClientRect();
      offsetX = event.touches[0].pageX - window.pageXOffset - rect.left;
      offsetY = event.touches[0].pageY - window.pageYOffset - rect.top;
    } else {
      offsetX = event.offsetX;
      offsetY = event.offsetY;
    }
    return { offsetX, offsetY };
  };

  /**
   * 既存のcanvas上の投げなわツールの解除・削除
   */
  const _removeLassoPath = () => {
    const { project } = paper;
    project.deselectAll();
    project.getItems({ name: "Lasso" }).map((item) => item.remove());

    setLassoPath(null);
    setLassoState("empty");
  };
  /**
   * 投げ縄以外をチョイスするためのfilter条件
   *
   */
  const notLassoPath = (item) => {
    return !(item.className === "Path" && item.closed === true);
  };

  /**
   *  投げなわ時にあたり判定を行う場所
   *
   */
  const isHitPaperItemAndLasso = (paperJsItem) => {
    let isHit;

    switch (paperJsItem.className) {
      case "Group":
        isHit = paperJsItem.intersects(lassoPath);
        break;
      case "Raster":
        isHit = judgeHitImageCase(lassoPath, paperJsItem);
        break;
      case "Path":
        isHit = judgeHit(lassoPath, paperJsItem);
        break;
    }
    return isHit;
  };

  /**
   * パスとパス（場合によっては画像）の当たり判定用の関数
   * @params lassoPath・・・投げ縄ツールで生成されたパス
   * @params targetPathOnCanvas・・・Canvas上にあるオブジェクト。
   */
  const judgeHit = (lassoPath, targetPathOnCanvas) => {
    /**
     * 投げなわがパスを内包するかを判定
     *
     **/
    const resultPath = targetPathOnCanvas.subtract(lassoPath);
    const targetIsInsideLasso = resultPath.isEmpty();
    resultPath.remove();

    if (targetIsInsideLasso) {
      return targetIsInsideLasso;
    }

    /**
     * パスと投げなわが交差するかどうかを判定
     *
     **/
    const resultPath2 = targetPathOnCanvas.getIntersections(lassoPath);
    const isCrossTwoPath = resultPath2.length > 0;

    return !!isCrossTwoPath;
  };

  const judgeHitImageCase = (lassoPath, targetPathOnCanvas) => {
    /**
     * 投げなわが画像を内包するかを判定
     *
     **/
    const copyBounds = targetPathOnCanvas.bounds;
    const { topLeft, bottomLeft, bottomRight, topRight } = copyBounds;
    const copyPath = new Path({
      segments: [topLeft, bottomLeft, bottomRight, topRight],
    });
    const resultPath = copyPath.subtract(lassoPath);
    const targetIsInsideLasso = resultPath.isEmpty();
    resultPath.remove();
    copyPath.remove();

    if (targetIsInsideLasso) {
      return targetIsInsideLasso;
    }

    /**
     * 画像と投げなわが交差するかどうかを判定
     *
     **/
    const resultPath2 = targetPathOnCanvas.intersects(lassoPath);

    return resultPath2;
  };

  /*
   * 投げなわ選択時、パス描画せずにすぐマウスアップした場合は投げなわパスを空っぽにする。
   * この場合segmentsCountは決まって2なのでマジックナンバー使用しても問題ない
   */
  const _cancelNewLasso = (e) => {
    const { segments } = lassoPath;
    const segmentsCount = segments.length;
    const { point } = segments[segmentsCount - 1];
    const { x, y } = e.point;

    if (segmentsCount === 2 && point.x === x && point.y === y) {
      _removeLassoPath();
      return true;
    }
    return false;
  };

  const lassoTool = new Tool();

  /**
   * 線の書き始め
   */
  const drawStart = (e) => {
    const { point, event } = e;
    const isLassoInside = lassoPath && lassoPath.contains(point);

    if (isLassoInside) {
      setLassoDraggable(true);
      return;
    }

    if (lassoState === "closed") {
      _removeLassoPath();
      setIsSelected(false);
      lassoPath.handleBounds.selected = false;
    }

    const newLassoPath = _initLassoPath(event);
    newLassoPath.add(point);

    setLassoPath(newLassoPath);
    setLassoState("onDrawing");
    // setIsSelected(true);
  };

  /**
   * 線の書き終わり
   */
  const drawing = (e) => {
    const { delta, point } = e;

    if (lassoState === "closed" && lassoDraggable) {
      PaperItem.getSelectedItems(paper, lassoPath).forEach((item) => {
        PaperItem.move(item, delta);
      });

      if (isSelected) {
        lassoPath.handleBounds.selected = true;
        const { bounds } = lassoPath;
        const deleteBtnRef = deleteBtn.current;
        deleteBtnRef.style.left = `${bounds.right}px`;
        deleteBtnRef.style.top = `${bounds.top}px`;
        deleteBtnRef.style.transform = "translate(-50%, -50%)";
      }
    } else if (lassoState === "onDrawing") {
      lassoPath.add(point);
    }
    paper.view.update();
  };

  /**
   * 線の書き終わり
   */
  const drawEnd = (e) => {
    const cancelNewLasso = lassoPath && _cancelNewLasso(e);
    setLassoDraggable(false);

    if (!lassoPath || lassoState === "closed" || cancelNewLasso) {
      return;
    }

    lassoPath.closed = true;
    setLassoState("closed");

    const hitItems = paper.project.getItems({
      recursive: true,
      match: (item) => notLassoPath(item) && isHitPaperItemAndLasso(item),
    });

    if (isSelected) {
      setIsSelected(true);

      lassoPath.handleBounds.selected = true;
      const { bounds } = lassoPath;
      const deleteBtnRef = deleteBtn.current;
      deleteBtnRef.style.left = `${bounds.right}px`;
      deleteBtnRef.style.top = `${bounds.top}px`;
      deleteBtnRef.style.transform = "translate(-50%, -50%)";
    }

    if (!hitItems.length) {
      _removeLassoPath();
      return;
    }

    hitItems.forEach((item) => (item.selected = true));
  };

  lassoTool.on("mousedown", (e) => drawStart(e));
  lassoTool.on("mousedrag", (e) => drawing(e));
  lassoTool.on("mouseup", (e) => drawEnd(e));
  lassoTool.activate();

  useEffect(() => {
    return () => {
      _removeLassoPath();
    };
  }, []);

  return (
    <>
      {isSelected && (
        <IconSquareRoundedX
          ref={deleteBtn}
          size={24}
          color="red"
          className="absolute"
        />
      )}
    </>
  );
};

export default LassoTool;
