import { useState, useCallback } from "react";

const hasSameStructure = (obj1: any, obj2: any): boolean => {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || typeof obj1[key] !== typeof obj2[key]) {
      return false;
    }

    if (
      typeof obj1[key] === "object" &&
      !hasSameStructure(obj1[key], obj2[key])
    ) {
      return false;
    }
  }

  return true;
};

const getStorageValue = <T extends object,>(key: string, defaultValue: T): T => {
  try {
    const rawData = localStorage.getItem(key);
    if (rawData === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }

    let parsedData = JSON.parse(rawData);
    if (!hasSameStructure(parsedData, defaultValue)) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return parsedData as T;
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
};

export const useStorage = <T extends object,>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] => {
  const [value, setValue] = useState(() => {
    return getStorageValue(key, defaultValue);
  });

  const updateStorage = useCallback(
    (newValue: T) => {
      localStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    },
    [key, setValue]
  );

  return [value, updateStorage];
};
