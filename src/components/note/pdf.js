/**
 * React
 */
import { useEffect, useState, useRef } from "react";

/**
 * Library
 */
import { createWorker, Worker } from "tesseract.js";
import { pdfjs, Document, Page } from "react-pdf";
import pdfjsWorkerSrc from "../../utils/pdf-worker";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorkerSrc;

/**
 * Components
 */
import Pagenation from "@/components/note/pdf/Pagenation";
import Overlay from "@/components/note/pdf/Overlay";

/**
 * @function Pdf
 *
 */
const Pdf = ({ layout }) => {
  /**
   * useState
   */
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isOverlayShowing, setIsOverlayShowing] = useState(false);

  /**
   * useRef
   */
  const canvasPdf = useRef(null);

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
  const onDocumentLoadSuccess = (pdf) => {
    setIsOverlayShowing(true);
    setTimeout(() => {
      setIsOverlayShowing(false);
    }, 1000);
  };

  return (
    <div className="text-center border-b border-solid border-[#eeeeee] pb-8">
      <Document
        inputRef={canvasPdf}
        file="/pdf/chinese-textbook.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        className="relative inline-flex justify-center"
      >
        <Page
          className="flex justify-end flex-none"
          height={1000}
          pageNumber={pageNumber}
        />

        {isOverlayShowing && (
          <Overlay width={canvasPdf.current?.width / 2} height={1000} />
        )}
      </Document>

      <Pagenation
        pageNumber={pageNumber}
        numPages={numPages}
        setPageNumber={setPageNumber}
      />

      {layout === 3 && (
        <p className="p-2 text-xs">
          読み上げたい文章をPDF上で四角でなぞってみよう！
        </p>
      )}
    </div>
  );
};

export default Pdf;
