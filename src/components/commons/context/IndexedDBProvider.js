import { useState, useEffect, useContext } from "react";
import IndexedDBContext from "@/components/commons/context/IndexedDBContext";

/** Context */
import HistoryContext from "@/components/commons/context/HistoryContext";

/** library */
import Dexie from "dexie";
import { paper } from "paper";

const maximumHistory = 10;

const IndexedDBProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  const { historyIndex } = useContext(HistoryContext);

  /**
   * @function getDataCount
   * indexedDBから全てのデータを取得する
   */
  const getDataCount = async () => {
    if (!db) return [];

    try {
      const data = await db.writingDataStore.count();
      return data;
    } catch (error) {
      return [];
    }
  };

  /**
   * @function getAllHistory
   * indexedDBから全てのデータを取得する
   */
  const getAllHistory = async () => {
    if (!db) return [];

    try {
      const data = await db.writingDataStore.toArray();
      return data;
    } catch (error) {
      return [];
    }
  };

  /**
   * @function addDataToIndexedDB
   * indexedDBにデータを追加する
   */

  const addDataToIndexedDB = async (jsonData) => {
    if (!db) return;

    try {
      const historyLength = await getDataCount();
      if (historyLength >= maximumHistory) {
        const allData = await getAllHistory();
        const deletTargetData = allData.shift();
        await db.writingDataStore.delete(deletTargetData.id);
        // setHistoryIndex(maximumHistory);
      }

      await db.writingDataStore.add({ writingData: jsonData });
    } catch (error) {}
  };

  /**
   * @function loadCurrentHistory
   * indexedDBからデータを取得する
   */
  const loadCurrentHistory = async (indexedDB) => {
    if (!indexedDB) return;

    try {
      const allData = await getAllHistory();
      const targetData = allData[historyIndex];
      if (targetData) {
        paper.project.importJSON(targetData.writingData);
      }
    } catch (error) {}
  };

  const handleLoadOperation = async () => {
    await setDb(indexedDB);
  };

  useEffect(() => {
    const initializeIndexedDB = async () => {
      const indexedDB = new Dexie("noteWriting");
      indexedDB.version(1).stores({ writingDataStore: "++id, writingData" });

      await indexedDB.open();
      await handleLoadOperation();
      await loadCurrentHistory(indexedDB);
    };

    initializeIndexedDB();

    return () => {
      if (db) {
        db.close();
        setDb(null);
      }
    };
  }, []);

  return (
    <IndexedDBContext.Provider
      value={{
        db,
        addDataToIndexedDB,
        getDataCount,
        getAllHistory,
        loadCurrentHistory,
      }}
    >
      {children}
    </IndexedDBContext.Provider>
  );
};

export default IndexedDBProvider;
