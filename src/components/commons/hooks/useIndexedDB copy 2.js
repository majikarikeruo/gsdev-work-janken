import { useState, useEffect } from "react";

/** library */
import { paper } from "paper";

function useIndexedDB(storeName) {
  const [db, setDb] = useState(null);

  /**
   * @function getAllHistory
   * indexedDBから全てのデータを取得する
   */
  const getAllHistory = (db) => {
    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll();

    request.onsuccess = (event) => {
      return request.result;
    };

    request.onerror = (event) => console.log("取得失敗。event:", event);
  };

  /**
   * @function addDataToIndexedDB
   * indexedDBにデータを追加する
   */
  const addDataToIndexedDB = (jsonData) => {
    if (!db) {
      return;
    }

    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);

    const request = objectStore.clear();
    request.onsuccess = (event) => {
      const data = {
        writingData: jsonData,
      };

      objectStore.add(data);

      // const getAllHistory = getAllHistory;
      // for (const [index, item] of Object.entries(getAllHistory)) {
      //   objectStore.put({
      //     id: parseInt(index),
      //     writingData: item,
      //   });
      // }
    };
    request.onerror = (event) => console.log("取得失敗。event:", event);
  };

  /**
   * @function _addInitialDataToIndexedDB
   * indexedDBに初期データを追加する
   */
  const _addInitialDataToIndexedDB = (db) => {
    const data = {
      id: null,
      writingData: "",
    };

    const transaction = db.transaction(storeName, "readwrite");
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.add(data);

    request.onsuccess = (event) => db.close();
    request.onerror = (event) => alert("Error");
  };

  /**
   * @function openedDB
   * indexedDBのデータベースを作成する
   */
  const openedDB = (db) => {
    if (!db.objectStoreNames.contains(storeName)) {
      const objectStore = db.createObjectStore(storeName, {
        keyPath: "id",
      });

      // objectStore.createIndex("id", "id", { unique: true });
      objectStore.createIndex("writingData", "writingData");
    }
  };

  const closeDB = (db) => {
    if (db) {
      db.close();
    }
  };

  useEffect(() => {
    /**indexedDBのストアを作成する */
    const request = indexedDB.open("noteWriting", 2);

    /** onupgradeneeded・・・ブラウザ内で当該DBがない場合に実行される */
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      openedDB(db);
      _addInitialDataToIndexedDB(db); /** 初期データを設定する */
    };

    /* indexedDBのストアを作成する */
    /* onsuccess・・・データベースを操作するために動作。オープンすることができたらsuccessイベント内でDB操作可能 */
    request.onsuccess = (event) => {
      const db = event.target.result;
      setDb(db); //useStateを使ってる
      openedDB(db);
    };

    request.onerror = (event) => {};

    return () => {
      closeDB(db);
    };
  }, [storeName]);

  return { addDataToIndexedDB, getAllHistory };
}
export default useIndexedDB;
