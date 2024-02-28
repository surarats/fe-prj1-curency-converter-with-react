import { useEffect, useState } from "react";
import { ExchangeRatesType, RateType } from "../Interface/currencyObjType";
import axios from "axios";

export function useExchangeRates() {
  const [exchangeData, setExchangeData] = useState<ExchangeRatesType>();
  const [exchangeRates, setExchangeRates] = useState<RateType>({});
  const [selectedCodeName, setSelectedCodeName] = useState<string>("EUR");
  const [isFollow, setIsFollow] = useState<Map<string, boolean>>(
    new Map(JSON.parse(localStorage.getItem("isFollow") || "[]"))
  );

  // === Follow button for follow interested currency ===
  const handleIsFollow = (codeName: string) => {
    const newMap: Map<string, boolean> = new Map(
      JSON.parse(localStorage.getItem("isFollow") || "[]")
    );
    if (
      isFollow.get(codeName) === false ||
      isFollow.get(codeName) === undefined
    ) {
      newMap.set(codeName, true);
    } else {
      newMap.set(codeName, false);
    }
    setIsFollow(newMap);
    localStorage.setItem("isFollow", JSON.stringify(Array.from(newMap)));
  };

  // === Get currencies rate from base currency ===
  const fetchExchangeRates = async (selectedCodeName: string) => {
    try {
      const res = await axios.get(
        `https://api.frankfurter.app/latest?from=${selectedCodeName}`
      );
      setExchangeData(res.data);
      setExchangeRates(res.data.rates);
    } catch (err) {}
  };

  useEffect(() => {
    fetchExchangeRates(selectedCodeName);
  }, [selectedCodeName]);

  return {
    exchangeData,
    setExchangeData,
    exchangeRates,
    setExchangeRates,
    selectedCodeName,
    setSelectedCodeName,
    isFollow,
    setIsFollow,
    handleIsFollow,
  };
}

export default useExchangeRates;
