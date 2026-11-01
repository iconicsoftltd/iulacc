import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Currency {
  code: "BDT" | "USD" | "SAR";
  name: string;
  symbol: string;
  flag: string;
}

interface CurrencyState {
  list: Currency[];
  loaded: boolean;
  currentCurrency: Currency;
}

export const currencies: Currency[] = [
  { code: "BDT", name: "৳", symbol: "৳", flag: "/flags/bd.png" },
  { code: "USD", name: "$", symbol: "$", flag: "/flags/usa.png" },
  { code: "SAR", name: "ر.س", symbol: "ر.س", flag: "/flags/sa.svg" },
];

const defaultCurrency = currencies[0];

const readSavedCurrency = (): Currency => {
  try {
    const saved = JSON.parse(localStorage.getItem("currentCurrency") || "null");
    const savedCode = saved?.code || saved?.name || saved?.symbol;
    return currencies.find((currency) =>
      [currency.code, currency.name, currency.symbol].includes(savedCode),
    ) || defaultCurrency;
  } catch {
    return defaultCurrency;
  }
};

const initialState: CurrencyState = {
  list: currencies,
  loaded: true,
  currentCurrency: readSavedCurrency(),
};

const currencySlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setCurrencies(state, action: PayloadAction<Currency[]>) {
      state.list = action.payload;
      state.loaded = true;
    },
    clearCurrencies(state) {
      state.list = [];
      state.loaded = false;
    },
    setCurrentCurrency(state, action: PayloadAction<Currency>) {
      state.currentCurrency = action.payload;
      localStorage.setItem("currentCurrency", JSON.stringify(action.payload));
    },
  },
});

export const { setCurrencies, clearCurrencies, setCurrentCurrency } =
  currencySlice.actions;
export default currencySlice.reducer;
