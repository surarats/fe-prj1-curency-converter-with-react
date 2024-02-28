import { useCurrencies } from "../../hooks/useCurrencies";
import { useConvert } from "../../hooks/useConvert";
import ConverterForm from "./ConverterForm";

const Converter = () => {
  const { currencies } = useCurrencies();

  const convert = useConvert();
  // const {
  //   amount,
  //   setAmount,
  //   currencyFrom,
  //   setCurrencyFrom,
  //   currencyTo,
  //   setCurrencyTo,
  //   convertRate,
  //   showCurrencyRate,
  // } = useConvert();

  const currencyObj = {
    ...convert,
  };

  return (
    <div className="flex flex-col items-center mx-auto max-sm:w-[350px] sm:w-[1150px] h-screen">
      <div className="w-full">
        <ConverterForm currencyObj={currencyObj} currencies={currencies} />
      </div>
    </div>
  );
};

export default Converter;
