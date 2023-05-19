import { useState } from "react";
import HistoryContext from "@/components/commons/context/HistoryContext";

const HistoryProvider = ({ children }) => {
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

  return (
    <HistoryContext.Provider
      value={{ historyIndex, historyGoBack, historyGoForward }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
