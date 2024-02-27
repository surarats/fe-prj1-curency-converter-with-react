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
