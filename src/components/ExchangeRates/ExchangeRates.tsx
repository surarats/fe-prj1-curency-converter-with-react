import { useCurrencies } from "../../hooks/useCurrencies";
import useExchangeRates from "../../hooks/useExchangeRates";
import ChangeRate from "./ChangeRate";

const ExchangeRates = () => {
  const { currencies } = useCurrencies();
  const {
    exchangeData,
    exchangeRates,
    selectedCodeName,
    setSelectedCodeName,
    isFollow,
    handleIsFollow,
  } = useExchangeRates();

  return (
    <div className="flex flex-col items-center h-fit w-[1150px] max-sm:w-[350px] mx-auto">
      <div className="w-full">
        <div className="flex max-sm:flex-col items-center justify-center gap-4 bg-indigo-200 p-4">
          <label className="font-bold text-xl max-sm:text-lg text-blue-900">
            BASE CURRENCY
          </label>
          <select
            className="border rounded shadow-lg  h-[48px] ps-2 outline-none w-[280px]"
            value={selectedCodeName}
            onChange={(e) => setSelectedCodeName(e.target.value)}
          >
            {Array.from(currencies).map(([codeName, name]) => {
              return (
                <option key={codeName} value={codeName}>
                  {codeName} - {name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="border rounded-b-lg mb-10">
          <table className="border-collapse border border-slate-100 w-full">
            <thead>
              <tr className="bg-indigo-50 text-xl h-[60px] max-sm:text-xs text-blue-900">
                <th className="">CURRENCY</th>
                <th className="border border-slate-200">AMOUNT (1)</th>
                <th className="border border-slate-200">CHANGE (24H)</th>
                <th className="border border-slate-200">FOLLOW</th>
              </tr>
            </thead>
            <tbody className="shadow-2xl">
              {Object.entries(exchangeRates).map(([codeName, rate]) => (
                <tr
                  key={codeName}
                  className={`hover:bg-green-200 ${
                    isFollow.get(codeName) && "bg-yellow-200"
                  }`}
                >
                  <td className="border border-slate-100 p-4 font-bold max-sm:text-xs max-sm:text-center">
                    <span className="max-sm:hidden">
                      {currencies.get(codeName)}
                    </span>
                    <span className="max-sm:text-xs sm:hidden">{codeName}</span>
                  </td>
                  <td className="border border-slate-100 p-4 text-center font-bold max-sm:text-xs">
                    {rate}
                  </td>
                  <td className="border border-slate-100 p-4 text-center max-sm:text-xs">
                    <ChangeRate
                      codeName={codeName}
                      rate={rate}
                      dateBase={exchangeData?.date}
                      selectedCodeName={selectedCodeName}
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
