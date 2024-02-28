// === Converter ===
export interface currencyObjType {
  amount: number;
  setAmount: React.Dispatch<React.SetStateAction<number>>;
  currencyFrom: string;
  setCurrencyFrom: React.Dispatch<React.SetStateAction<string>>;
  currencyTo: string;
  setCurrencyTo: React.Dispatch<React.SetStateAction<string>>;
  convertRate: number;
  showCurrencyRate: boolean;
}

// === Exchange Rate ===
export interface ExchangeRatesType {
  amount: number;
  base: string;
  date: string;
  rates: RateType;
}

export interface RateType {
  [key: string]: number;
}

// === Change Rate ===
export interface ChangeRateType {
  codeName: string;
  rate: number;
  dateBase: string | undefined;
  selectedCodeName: string;
}
