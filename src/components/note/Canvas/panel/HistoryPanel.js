/**
 * Icons
 */
import { IconArrowBackUp, IconArrowForwardUp } from "@tabler/icons-react";

/**
 * React
 */
import { useState, useEffect, useContext } from "react";

/** library */
import { paper } from "paper";

/** Hooks */
// import useHistories from "@/components/commons/hooks/useHistories";

/** Context */
import HistoryContext from "@/components/commons/context/HistoryContext";
import IndexedDBContext from "@/components/commons/context/IndexedDBContext";

const HistoryPanel = () => {
  const [count, setCount] = useState(0);

  const { historyIndex, historyGoBack, historyGoForward } =
    useContext(HistoryContext);
  const { db, getAllHistory, getDataCount, loadCurrentHistory } =
    useContext(IndexedDBContext);

  /**
   * @function handleGoBack
   * move to previous history
   */
  const handleGoBack = async () => {
    await historyGoBack();
    loadCurrentHistory();
  };

  /**
   * @function handleGoForward
   * move to next history
   */
  const handleGoForward = async () => {
    await historyGoForward();
    loadCurrentHistory();
  };

  useEffect(() => {
    const getCount = async () => {
      const res = await getDataCount();
      setCount(res);
      return res;
    };
    getCount();
  }, [count, historyIndex]);

  return (
    <>
      <IconArrowBackUp
        onClick={() => handleGoBack()}
        className={historyIndex === 0 ? "pointer-events-none" : ""}
        color={historyIndex === 0 ? "#ccc" : "#000"}
      />
      <IconArrowForwardUp
        onClick={() => handleGoForward()}
        className={historyIndex === count ? "pointer-events-none" : ""}
        color={historyIndex === count ? "#ccc" : "#000"}
      />
    </>
  );
};

export default HistoryPanel;
