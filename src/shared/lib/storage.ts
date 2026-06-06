import type { Result } from "./result";
import { ok, err } from "./result";

export function storageGet<T>(
  key: string,
  parse: (raw: unknown) => T
): Result<T, "missing" | "invalid"> {
  let raw: string | null;
  try {
    raw = localStorage.getItem(key);
  } catch {
    return err("missing");
  }
  if (raw === null) return err("missing");
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw) as unknown;
  } catch {
    return err("invalid");
  }
  try {
    return ok(parse(parsed));
  } catch {
    return err("invalid");
  }
}

export function storageSet(key: string, value: unknown): Result<void, "write-failed"> {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return ok(undefined);
  } catch {
    return err("write-failed");
  }
}

export function storageRemove(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // Storage may be unavailable; fail silently.
  }
}

export function indexedDbSet(
  storeName: string,
  key: string,
  value: unknown
): Promise<void> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("pmc-idb", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readwrite");
      tx.objectStore(storeName).put(value, key);
      tx.oncomplete = () => { db.close(); resolve(); };
      tx.onerror = () => { db.close(); reject(tx.error); };
    };
    request.onerror = () => reject(request.error);
  });
}

export function indexedDbGet<T>(
  storeName: string,
  key: string
): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("pmc-idb", 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(storeName)) {
        db.createObjectStore(storeName);
      }
    };
    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, "readonly");
      const getReq = tx.objectStore(storeName).get(key);
      getReq.onsuccess = () => {
        db.close();
        resolve(getReq.result as T | undefined);
      };
      getReq.onerror = () => { db.close(); reject(getReq.error); };
    };
    request.onerror = () => reject(request.error);
  });
}
