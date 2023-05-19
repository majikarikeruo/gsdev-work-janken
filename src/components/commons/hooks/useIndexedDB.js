import { useState, useEffect } from "react";

/** library */
import { paper } from "paper";
import Dexie from "dexie";
const maximumHistory = 10;

import useHistories from "@/components/commons/hooks/useHistories";

function useIndexedDB(storeName) {
  const { historyIndex, setHistoryIndex } = useHistories(); //関数コンポーネント直下で呼び出さないとエラーになる

  const [db, setDb] = useState(null);

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

  useEffect(() => {
    const indexedDB = new Dexie("noteWriting");
    indexedDB.version(1).stores({ writingDataStore: "++id, writingData" });

    indexedDB.open().then(() => {
      setDb(indexedDB);
    });

    return () => {
      if (db) {
        db.close();
        setDb(null);
      }
    };
  }, []);

  return { db, addDataToIndexedDB, getAllHistory, getDataCount };
}
export default useIndexedDB;
