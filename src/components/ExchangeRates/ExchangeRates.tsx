import { useEffect, useState } from "react";
import { useCurrencies } from "../../hooks/useCurrencies";
import axios from "axios";
import dayjs from "dayjs";

interface ExchangeRatesType {
  amount: number;
  base: string;
  date: string;
  rates: RateType;
}

interface RateType {
  [key: string]: number;
}

const ExchangeRates = () => {
  const [exchangeData, setExchangeData] = useState<ExchangeRatesType>();
  const [exchangeRates, setExchangeRates] = useState<RateType>({});
  const [selectedCodeName, setSelectedCodeName] = useState<string>("EUR");
  const [isFollow, setIsFollow] = useState<Map<string, boolean>>(
    new Map(JSON.parse(localStorage.getItem("isFollow") || "[]"))
  );
  const { currencies } = useCurrencies();

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

  const handleSelectCodeName = (codeName: string) => {
    setSelectedCodeName(codeName);
    console.log(codeName);
  };

  const ChangeRate = ({
    codeName,
    rate,
    dateFrom,
  }: {
    codeName: string;
    rate: number;
    dateFrom: string | undefined;
  }) => {
    const [changeRates, setChangeRates] = useState<Map<string, number>>(
      new Map()
    );

    const fetchExchangeRates24 = async (
      codeName: string,
      dateFrom: string | undefined
    ) => {
      if (dateFrom !== undefined) {
        let currentDate: Date = new Date(dateFrom);

        // currentDate.setDate(currentDate.getDate() - 1);
        currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
        let last24hr = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        last24hr = dayjs(last24hr).format("YYYY-MM-DD");

        const newMap = new Map(Array.from(changeRates));
        try {
          const res = await axios.get(
            `https://api.frankfurter.app/${last24hr}?from=${selectedCodeName}`
          );
          newMap.set(codeName, res.data.rates[codeName]);
          setChangeRates(newMap);
        } catch (err) {}
      }
    };

    useEffect(() => {
      fetchExchangeRates24(codeName, dateFrom);
    }, []);

    const showRateChange = (
      ((rate - Number(changeRates.get(codeName))) /
        Number(changeRates.get(codeName))) *
      100
    ).toFixed(2);

    return (
      <span
        className={`${
          Number(showRateChange) < 0 ? "text-red-600" : "text-green-600"
        } font-bold`}
      >
        {Number(showRateChange) >= 0 ? "+" + showRateChange : showRateChange}%
      </span>
    );
  };

  return (
    <div className="flex flex-col items-center h-screen">
      <div className="w-[1150px] max-sm:w-[350px]">
        <div className="flex items-center justify-center gap-4 bg-indigo-200 p-4">
          <label className="font-bold text-xl mb-2">Base Currency</label>
          <select
            className="border rounded shadow-lg  h-[48px] ps-2 outline-none w-[280px]"
            value={selectedCodeName}
            onChange={(e) => handleSelectCodeName(e.target.value)}
          >
            {Array.from(currencies).map(([codeName, name]) => {
              return (
                <option value={codeName}>
                  {codeName} - {name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="border rounded-b-lg mb-10">
          <table className="border-collapse border border-slate-100 w-full">
            <th className="bg-indigo-50 text-2xl p-2 ">Currency</th>
            <th className="bg-indigo-50 text-2xl p-2 w-[350px] ">Amount (1)</th>
            <th className="bg-indigo-50 text-2xl p-2 w-[350px]">
              Change (24h)
            </th>
            <th className="bg-indigo-50 text-2xl p-2 w-[150px]">Follow</th>
            <tbody className="shadow-2xl">
              {Object.entries(exchangeRates).map(([codeName, rate]) => (
                <tr
                  className={`hover:bg-green-200 ${
                    isFollow.get(codeName) && "bg-yellow-200"
                  }`}
                >
                  <td className="border border-slate-100 p-4 font-bold">
                    {currencies.get(codeName)}
                  </td>
                  <td className="border border-slate-100 p-4 text-center font-bold">
                    {rate}
                  </td>
                  <td className="border border-slate-100 p-4 text-center">
                    <ChangeRate
                      codeName={codeName}
                      rate={rate}
                      dateFrom={exchangeData?.date}
                    />
                  </td>
                  <td className="border border-slate-100 text-center">
                    {!isFollow.get(codeName) ? (
                      <button
                        className="bg-green-500  active:bg-green-600 text-white text-xl font-bold w-[35px] h-[35px] rounded-md"
                        onClick={() => handleIsFollow(codeName)}
                      >
                        +
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 active:bg-red-600 text-white text-xl font-bold w-[35px] h-[35px] rounded-md"
                        onClick={() => handleIsFollow(codeName)}
                      >
                        -
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRates;
