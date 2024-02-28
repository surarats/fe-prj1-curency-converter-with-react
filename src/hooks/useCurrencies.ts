import { useState, useEffect } from "react";
import axios from "axios";

export const useCurrencies = () => {
  const [currencies, setCurrencies] = useState<Map<string, string>>(new Map());

  // === Get currencies name and map shortname, fullname ===
  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await axios.get("https://api.frankfurter.app/currencies");
        const newMap = new Map();
        Object.entries(res.data).forEach(([key, value]: any[]) => {
          newMap.set(key, value);
        });
        setCurrencies(newMap);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrency();
  }, []);

  return { currencies };
};
