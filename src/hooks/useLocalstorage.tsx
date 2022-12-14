import { useEffect, useState } from "react";

// Hook
function useLocalStorage(key: string, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<string>();

  useEffect(() => {
    let val;
    if (typeof window === "undefined") {
      val = initialValue;
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      if (!item) {
        val = initialValue;
      } else {
        val = item;
      }
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      val = initialValue;
    }
    setStoredValue(val);
  }, [initialValue, key]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [storedValue, setValue] as const;
}

export default useLocalStorage;
