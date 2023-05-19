import { useState, useEffect } from "react";

/** library */
import { paper } from "paper";

import useIndexedDB from "@/components/commons/hooks/useIndexedDB";

function useHistories() {
  const [historyIndex, setHistoryIndex] = useState(0);

  const historyGoBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
    }
  };

  const historyGoForward = () => {
    if (historyIndex < 10) {
      setHistoryIndex(historyIndex + 1);
    }
  };

  const currentHistoryCount = () => {
    return historyIndex;
  };

  return {
    historyIndex,
    setHistoryIndex,
    historyGoBack,
    historyGoForward,
    currentHistoryCount,
  };
}

export default useHistories;
