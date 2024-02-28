import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ChangeRateType } from "../../Interface/currencyObjType";

const ChangeRate = ({
  codeName,
  rate,
  dateBase,
  selectedCodeName,
}: ChangeRateType) => {
  const [rateChange, setRateChange] = useState<number>(0);

  // === Get prev rate from API prev date to now, and set prev rate into setPrevRates  ===
  const fetchPrevRates = async (
    codeName: string,
    dateBase: string | undefined
  ) => {
    if (dateBase !== undefined) {
      try {
        let currentDate: Date = new Date(dateBase);

        currentDate.setTime(currentDate.getTime() - 24 * 60 * 60 * 1000);
        let last24hr = `${currentDate.getFullYear()}-${
          currentDate.getMonth() + 1
        }-${currentDate.getDate()}`;
        last24hr = dayjs(last24hr).format("YYYY-MM-DD");
        const res = await axios.get(
          `https://api.frankfurter.app/${last24hr}?from=${selectedCodeName}`
        );
        const prev24Rate: number = res.data.rates[codeName];
        const rateChangeResult: number = Number(
          (((rate - prev24Rate) / prev24Rate) * 100).toFixed(2)
        );
        setRateChange(rateChangeResult);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    fetchPrevRates(codeName, dateBase);
  }, [rate]);

  return (
    <span
      className={`${
        Number(rateChange) < 0 ? "text-red-600" : "text-green-600"
      } font-bold`}
    >
      {rateChange >= 0 ? `+${rateChange}%` : `${rateChange}%`}
    </span>
  );
};

export default ChangeRate;
