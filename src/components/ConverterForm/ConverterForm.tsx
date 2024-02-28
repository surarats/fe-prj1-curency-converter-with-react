import { currencyObjType } from "../../Interface/currencyObjType";
import ConverterDisplay from "./CoverterDisplay";

const ConverterForm = ({
  currencies,
  currencyObj,
}: {
  currencies: Map<string, string>;
  currencyObj: currencyObjType;
}) => {
  const {
    amount,
    setAmount,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    showCurrencyRate,
  } = currencyObj;

  return (
    <>
      {/* Currency Convert Form Section*/}
      <section className="bg-indigo-50 py-4 px-20 shadow-2xl w-full border-red-600">
        <div className="flex justify-around max-sm:flex-col">
          <div className="flex flex-col items-start mb-5">
            <label className="font-bold text-xl mb-2 max-sm:text-lg text-blue-900">
              AMOUNT
            </label>
            <input
              className="border rounded shadow-lg h-[48px] w-full ps-2 outline-none"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              min={0}
            />
          </div>
          <div className="flex flex-col items-start mb-5 ">
            <label className="font-bold text-xl mb-2 max-sm:text-lg text-blue-900">
              FROM
            </label>
            <select
              className="border rounded shadow-lg  h-[48px] w-full ps-2 outline-none"
              onChange={(e) => setCurrencyFrom(e.target.value)}
              value={currencyFrom}
            >
              {Array.from(currencies.keys()).map((codeName: string) => {
                return (
                  <option
                    key={codeName}
                    value={codeName}
                  >{`${codeName} - ${currencies.get(codeName)}`}</option>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col items-start mb-5">
            <label className="font-bold text-xl mb-2 max-sm:text-lg text-blue-900">
              TO
            </label>
            <select
              className="border rounded shadow-lg h-[48px] w-full ps-2 outline-none"
              onChange={(e) => setCurrencyTo(e.target.value)}
              value={currencyTo}
            >
              {Array.from(currencies.keys()).map((code: string) => {
                return (
                  <option key={code} value={code}>{`${code} - ${currencies.get(
                    code
                  )}`}</option>
                );
              })}
            </select>
          </div>
        </div>
      </section>
      {/* Show Currency Rate Section */}
      {showCurrencyRate && <ConverterDisplay currencyObj={currencyObj} />}
    </>
  );
};

export default ConverterForm;
