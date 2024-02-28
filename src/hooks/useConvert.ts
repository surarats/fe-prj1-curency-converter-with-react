import { useState, useEffect } from "react";
import axios from "axios";

export const useConvert = () => {
  const [amount, setAmount] = useState<number>(1);
  const [currencyFrom, setCurrencyFrom] = useState<string>("EUR");
  const [currencyTo, setCurrencyTo] = useState<string>("USD");
  const [convertRate, setConvertRate] = useState<number>(0);
  const [showCurrencyRate, setShowCurrencyRate] = useState<boolean>(false);

  // === Get convert currency rate from base-currencies ===
  useEffect(() => {
    const handleConvert = async () => {
      if (currencyFrom !== "" && currencyTo !== "" && amount > 0) {
        if (currencyFrom === currencyTo) {
          setConvertRate(1);
        } else {
          const res = await axios.get(
            `https://api.frankfurter.app/latest?from=${currencyFrom}&to=${currencyTo}`
          );

          let result = res.data.rates[currencyTo];
          setConvertRate(result);
        }
        setShowCurrencyRate(true);
      } else {
        setConvertRate(0);
        setShowCurrencyRate(false);
      }
    };
    handleConvert();
  }, [amount, currencyFrom, currencyTo]);

  return {
    amount,
    setAmount,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    convertRate,
    showCurrencyRate,
  };
};
