/**
 * React
 */
import { useEffect, useState, useRef } from "react";

/**
 * Mantine
 */
import { Flex } from "@mantine/core";

import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

/**
 * Library
 */
import { createWorker, Worker } from "tesseract.js";
import { pdfjs, Document, Page, Annotation, Canvas } from "react-pdf";
import pdfjsWorkerSrc from "../../utils/pdf-worker";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;

/**
 * @function PdfPanel
 *
 */
const PdfPanel = ({ layout }) => {
  /**
   * useState
   */
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [rectEnd, setRectEnd] = useState({ x: 0, y: 0 });

  /**
   * useRef
   */
  const canvasPdf = useRef(null);
  const overlay = useRef(null);
  const preview = useRef(null);

  /**
   * @function toBlob
   * 画像データをBlob形式に変換する
   */
  const toBlob = (imageData) => {
    return new Promise((resolve) => {
      const canvas = preview.current;
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      const ctx = canvas.getContext("2d");
      const imageDataCloned = new ImageData(
        new Uint8ClampedArray(imageData.data),
        imageData.width,
        imageData.height
      );
      ctx.putImageData(imageDataCloned, 0, 0);
      canvas.toBlob(resolve);
    });
  };

  /**
   * @function recognizeCropImageToText
   * 切り取りした画像をterasect.jsで文字認識する
   */
  const recognizeCropImageToText = async (image) => {
    try {
      const worker = await createWorker({
        logger: (log) => {},
      });
      await worker.load();
      await worker.loadLanguage("chi_tra");
      await worker.initialize("chi_tra");

      const {
        data: { text },
      } = await worker.recognize(await toBlob(image));

      speechRecognizedText(text);

      await worker.terminate();

      return text;
    } catch (err) {
      console.log(err);
    }
  };
  /**
   * @function speechRecognizedText
   * 認識した文字を読み上げる
   */
  const speechRecognizedText = (text) => {
    let speech = new SpeechSynthesisUtterance(text);
    speech.lang = "zh-TW";

    window.speechSynthesis.speak(speech);
  };

  /**
   * @function onDocumentLoadSuccess
   *
   **/
  const onDocumentLoadSuccess = ({ numPages }) => {
    console.log(numPages, 123);
    setNumPages(numPages);
  };

  /**
   * @function handleNextPage
   *
   */
  const handleNextPage = () => {
    if (pageNumber === numPages) return;
    setPageNumber(pageNumber + 1);
  };

  /**
   * @function handlePrevPage
   *
   */
  const handlePrevPage = () => {
    if (pageNumber === 1) return;

    setPageNumber(pageNumber - 1);
  };

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

    const scale = window.devicePixelRatio;

    // 現在のマウスの位置を取得して、rectEndにセット
    const { x, y } = getCurrentMousePos(e);
    setRectEnd({ x, y });

    // 選択した範囲の横幅と高さを取得
    const { width, height } = getRectangleSize(origin, rectEnd);

    if (!width) {
      console.log(111);

      setOrigin({ x: 0, y: 0 });
      setRectEnd({ x: 0, y: 0 });
      return false;
    }

    const ctx = canvasPdf.current.getContext("2d");
    const overlayCtx = overlay.current.getContext("2d");

    console.log(scale);
    // 指定した範囲の画像を取得
    const targetImage = ctx.getImageData(
      origin.x * scale,
      origin.y * scale,
      width * scale,
      height * scale
    );
    console.log(x, y, canvasPdf, origin);
    console.log(targetImage, overlay.current.width, overlay.current.height);

    // 画像認識させる
    const result = await recognizeCropImageToText(targetImage);

    // 色々初期化
    overlayCtx.clearRect(0, 0, overlay.current.width, overlay.current.height);

    setOrigin({ x: 0, y: 0 });
    setRectEnd({ x: 0, y: 0 });

    //ちゃんと取れているか結果表示
    console.log(result);
  };

  return (
    <div className="text-center border-b border-solid border-[#eeeeee] pb-8">
      <Document
        file="/pdf/chinese-textbook.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative inline-flex justify-center"
      >
        <Page
          className="flex justify-end flex-none"
          height={1000}
          pageNumber={pageNumber}
          canvasRef={canvasPdf}
        />

        <canvas
          ref={overlay}
          width={canvasPdf.current?.width}
          height={canvasPdf.current?.height}
          className="absolute top-0 left-0"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        ></canvas>
      </Document>
      <canvas ref={preview} className="hidden"></canvas>
      {/* pager */}
      <Flex justify="center" align="center" className="p-3">
        <IconChevronLeft onClick={handlePrevPage} disabled={pageNumber === 1} />

        <p className="h-auto mx-4">
          <span className="inline-block mr-2">Page</span> {pageNumber} /{" "}
          {numPages}
        </p>
        <IconChevronRight onClick={handleNextPage} />
      </Flex>
      {layout === 3 && (
        <p className="p-2 text-xs">
          読み上げたい文章をPDF上で四角でなぞってみよう！
        </p>
      )}

      {/* // pager */}
    </div>
  );
};

export default PdfPanel;
