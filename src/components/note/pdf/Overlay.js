/**
 * React
 */
import { useEffect, useState, useRef } from "react";

const Overlay = ({ width, height }) => {
  /**
   * useRef
   */
  const overlay = useRef(null);

  /**
   * useState
   */
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [rectEnd, setRectEnd] = useState({ x: 0, y: 0 });

  /**
   * @function getCurrentMousePos
   * マウスの現在位置を取得する
   */
  const getCurrentMousePos = (e) => {
    const { clientX, clientY } = e;
    const x = clientX - overlay.current.getBoundingClientRect().left;
    const y = clientY - overlay.current.getBoundingClientRect().top;
    return { x, y };
  };

  /**
   * @function getRectangleSize
   *
   */
  const getRectangleSize = (origin, rectEnd) => {
    const width = rectEnd.x - origin.x;
    const height = rectEnd.y - origin.y;
    return { width, height };
  };

  /**
   * @function handleMouseDown
   * PDF上をクリックしたときの処理
   */
  const handleMouseDown = (e) => {
    const { x, y } = getCurrentMousePos(e);

    setOrigin({ x, y });
    setRectEnd({ x, y });
  };

  /**
   * @function handleMouseMove
   * PDF上をマウスムーブしたときの処理
   */
  const handleMouseMove = (e) => {
    const { x, y } = getCurrentMousePos(e);

    if (!origin.x) {
      return false;
    }

    setRectEnd({ x, y });
    const { width, height } = getRectangleSize(origin, rectEnd);

    const ctx = overlay.current.getContext("2d");
    ctx.lineWidth = 2;
    ctx.strokeStyle = "red";
    ctx.clearRect(0, 0, overlay.current.width, overlay.current.height);
    ctx.beginPath();
    ctx.strokeRect(origin.x, origin.y, width, height);
  };

  /**
   * PDF上でマウスアップした時の処理
   */
  const handleMouseUp = async (e) => {
    if (!origin.x) {
      return false;
    }

    // これで判定しないとなんか色々やばかった
    // const scale = window.devicePixelRatio;

    // 現在のマウスの位置を取得して、rectEndにセット
    const { x, y } = getCurrentMousePos(e);
    setRectEnd({ x, y });

    // 選択した範囲の横幅と高さを取得
    const { width, height } = getRectangleSize(origin, rectEnd);

    if (!width) {
      setOrigin({ x: 0, y: 0 });
      setRectEnd({ x: 0, y: 0 });
      return false;
    }

    // const ctx = canvasPdf.current.getContext("2d");
    const overlayCtx = overlay.current.getContext("2d");

    // 指定した範囲の画像を取得
    // const targetImage = ctx.getImageData(
    //   origin.x * scale,
    //   origin.y * scale,
    //   width * scale,
    //   height * scale
    // );

    // Todo: 画像認識させる。ここをuseContext使って親に送信できたら最高
    // const result = await recognizeCropImageToText(targetImage);

    // 色々初期化
    overlayCtx.clearRect(0, 0, overlay.current.width, overlay.current.height);

    setOrigin({ x: 0, y: 0 });
    setRectEnd({ x: 0, y: 0 });

    //ちゃんと取れているか結果表示
  };

  return (
    <canvas
      ref={overlay}
      width={width}
      height={height}
      className="absolute top-0 left-0"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    ></canvas>
  );
};

export default Overlay;
