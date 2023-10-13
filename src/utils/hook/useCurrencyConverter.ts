import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  fetchCurrencies,
  selectCurrencies,
} from "../../redux/currencies/currenciesSlice";

interface InputValues {
  [name: string]: string;
}

export function useCurrencyConverter() {
  const dispatch = useAppDispatch();
  const currencies = useAppSelector(selectCurrencies);
  const [inputValues, setInputValues] = useState<InputValues>({});
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(
    null
  ); // Используем NodeJS.Timeout

  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    const storedValue = localStorage.getItem("selectedValue");

    if (storedCurrency && storedValue) {
      dispatch(
        fetchCurrencies({
          name: storedCurrency,
          value: parseFloat(storedValue),
        })
      );
    } else {
      dispatch(fetchCurrencies({ name: "USD", value: 1 }));
    }
  }, [dispatch]);

  useEffect(() => {
    const initialInputValues: InputValues = {};
    if (Array.isArray(currencies)) {
      currencies.forEach((currency: any) => {
        initialInputValues[currency.name] = currency.value.toString();
      });
    }
    setInputValues(initialInputValues);
  }, [currencies]);

  const calculateConvertedValues = (name: string, value: string) => {
    const numericValue = value === "" ? 0 : parseFloat(value);

    const data = {
      name: name,
      value: numericValue,
    };
    dispatch(fetchCurrencies(data));
  };

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newDebounceTimeout = setTimeout(() => {
      calculateConvertedValues(name, value);
    }, 500);

    setDebounceTimeout(newDebounceTimeout);

    localStorage.setItem("selectedCurrency", name);
    localStorage.setItem("selectedValue", value);
  };

  const setSelectedCurrencyAndSaveToLocalStorage = (currency: string) => {
    setSelectedCurrency(currency);
    localStorage.setItem("selectedCurrency", currency);
  };

  useEffect(() => {
    const storedCurrency = localStorage.getItem("selectedCurrency");
    if (storedCurrency) {
      setSelectedCurrency(storedCurrency);
    }
  }, []);

  return {
    currencies,
    inputValues,
    handleInputChange,
    setSelectedCurrency: setSelectedCurrencyAndSaveToLocalStorage,
  };
}
