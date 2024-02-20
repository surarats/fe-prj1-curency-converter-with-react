import React, { useEffect, useState } from "react";
import axios from "axios";

const Converter = () => {
  const [amount, setAmount] = useState<number>(0);
  const [currencies, setCurrencies] = useState<string[][]>([[]]);
  const [currencyFrom, setCurrencyFrom] = useState<string>("");
  const [currencyTo, setCurrencyTo] = useState<string>("");
  const [convertRate, setConvertRate] = useState<number>(0);
  const [showCurrencyRate, setShowCurrencyRate] = useState<boolean>(false);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const res = await axios.get("https://api.frankfurter.app/currencies");
        const currenciesArr: string[][] = Object.entries(res.data);
        setCurrencies(currenciesArr);
      } catch (err) {}
    };

    fetchCurrency();
  }, []);

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
  }, [currencyFrom, currencyTo, amount]);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Currency Convert Form Section*/}
      <section className="bg-blue-950 p-4 px-20 m-10">
        <h1 className="text-4xl text-white font-bold mb-5 text-center">
          Currency Converter
        </h1>
        <div className="converter-container flex justify-around">
          <div className="flex flex-col items-start mb-5">
            <label className="font-bold text-white">Amount</label>
            <input
              className="border rounded shadow-lg h-[48px] w-full ps-2 outline-none"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              min={0}
            />
          </div>
          <div className="flex flex-col items-start mb-5 ">
            <label className="font-bold text-white">From</label>
            <select
              className="border rounded shadow-lg  h-[48px] w-full ps-2 outline-none"
              onChange={(e) => setCurrencyFrom(e.target.value)}
            >
              <option value="">Select Currency</option>
              {currencies.map(([code, name]) => {
                return (
                  <option key={code} value={code}>{`${code} - ${name}`}</option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col items-start mb-5">
            <label className="font-bold text-white">To</label>
            <select
              className="border rounded shadow-lg h-[48px] w-full ps-2 outline-none"
              onChange={(e) => setCurrencyTo(e.target.value)}
            >
              <option value="">Select Currency</option>
              {currencies.map(([code, name]) => {
                return (
                  <option key={code} value={code}>{`${code} - ${name}`}</option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Show Currency Rate Section*/}

        {showCurrencyRate && (
          <section className="mx-auto w-fit text-white flex">
            <div className="me-10">
              <div className="text-4xl font-bold">
                {amount} {currencyFrom} =
              </div>
              <div className="text-5xl font-bold">
                {(amount * convertRate).toLocaleString()} {currencyTo}
              </div>
            </div>
            <div className="ms-2 mt-7">
              <div>
                1 {currencyFrom} = {convertRate} {currencyTo}
              </div>

              {currencyFrom !== currencyTo && (
                <div>
                  1 {currencyTo} = {(1 / convertRate).toFixed(4)} {currencyFrom}
                </div>
              )}
            </div>
          </section>
        )}
      </section>
    </div>
  );
};

export default Converter;
