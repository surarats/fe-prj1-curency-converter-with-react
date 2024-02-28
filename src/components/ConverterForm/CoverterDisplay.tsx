import { currencyObjType } from "../../Interface/currencyObjType";
const ConverterDisplay = ({
  currencyObj,
}: {
  currencyObj: currencyObjType;
}) => {
  const { amount, currencyFrom, currencyTo, convertRate } = currencyObj;

  return (
    <section className="py-4 px-10 flex max-sm:flex-col items-center justify-center border rounded-b-lg shadow-2xl bg-white h-[200px]">
      <div className="me-10 max-sm:me-0">
        <div className="text-4xl max-sm:text-2xl font-bold ">
          {amount} {currencyFrom} =
        </div>
        <div className="text-5xl max-sm:text-3xl font-bold ">
          {(amount * convertRate).toLocaleString()} {currencyTo}
        </div>
      </div>
      <div className="ms-2 max-sm:ms-0 mt-7 ">
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
  );
};

export default ConverterDisplay;
