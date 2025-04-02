import { useState, useEffect } from "react";
import { MinerInfo } from "@/types";

const STORAGE_KEY = "minerInfo";

const useStoredMinerInfo = () => {
  // Initialize state from localStorage
  const [storedMinerInfo, setStoredMinerInfo] = useState<MinerInfo | null>(() => {
    try {
      const result = localStorage.getItem(STORAGE_KEY);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.error("Error parsing stored minerInfo from localStorage", error);
      return null;
    }
  });

  // Function to update both localStorage and state
  const storeMinerInfo = (minerInfo: MinerInfo) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(minerInfo));
      setStoredMinerInfo(minerInfo); // This ensures the React state updates

      // Manually trigger a storage event (fixes same-tab update issue)
      window.dispatchEvent(new Event("minerInfoUpdated"));
    } catch (error) {
      console.error("Error saving minerInfo to localStorage", error);
    }
  };

  useEffect(() => {
    // Function to sync state with localStorage
    const syncMinerInfo = () => {
      try {
        const result = localStorage.getItem(STORAGE_KEY);
        setStoredMinerInfo(result ? JSON.parse(result) : null);
      } catch (error) {
        console.error("Error syncing minerInfo from localStorage", error);
        setStoredMinerInfo(null);
      }
    };

    // Listen for manual updates
    window.addEventListener("minerInfoUpdated", syncMinerInfo);

    return () => {
      window.removeEventListener("minerInfoUpdated", syncMinerInfo);
    };
  }, []);

  return { storedMinerInfo, storeMinerInfo };
};

export default useStoredMinerInfo;
