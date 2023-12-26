import { useState, useCallback } from "react";

const getStorageValue = <T,>(key: string, defaultValue: T): T => {
  try {
    const data = localStorage.getItem(key);
    if (data === null) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(data) as T;
  } catch (error) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
};

export const useStorage = <T,>(
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
