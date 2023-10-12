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

  useEffect(() => {
    dispatch(fetchCurrencies({ name: selectedCurrency, value: 1 }));
  }, [dispatch, selectedCurrency]);

  useEffect(() => {
    const initialInputValues: InputValues = {};
    currencies.forEach((currency: any) => {
      initialInputValues[currency.name] = currency.value.toString();
    });
    setInputValues(initialInputValues);
  }, [currencies]);

  const calculateConvertedValues = (name: string, value: string) => {
    const numericValue = value === "" ? 0 : parseFloat(value);
    const updatedInputValues: InputValues = {};

    for (const currency of currencies) {
      if (currency.name !== name) {
        const convertedValue = (
          (numericValue / currencies.find((c: any) => c.name === name)?.value) *
          currency.value
        ).toFixed(2);

        updatedInputValues[currency.name] = convertedValue;
      }
    }

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      ...updatedInputValues,
    }));
  };

  const handleInputChange = (name: string, value: string) => {
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [name]: value,
    }));

    calculateConvertedValues(name, value);
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
