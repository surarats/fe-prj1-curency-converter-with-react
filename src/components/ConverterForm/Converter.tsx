import { useCurrencies } from "../../hooks/useCurrencies";
import { useConvert } from "../../hooks/useConvert";
import ConverterForm from "./ConverterForm";

const Converter = () => {
  const { currencies } = useCurrencies();

  const {
    amount,
    setAmount,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    convertRate,
    showCurrencyRate,
  } = useConvert();

  const currencyObj = {
    amount,
    setAmount,
    currencyFrom,
    setCurrencyFrom,
    currencyTo,
    setCurrencyTo,
    convertRate,
    showCurrencyRate,
  };

  return (
    <div className="flex flex-col items-center h-screen ">
      <div className="w-[1150px] max-sm:w-[350px]">
        <ConverterForm currencyObj={currencyObj} currencies={currencies} />
      </div>
    </div>
  );
};

export default Converter;
