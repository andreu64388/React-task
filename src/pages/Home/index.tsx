import { FC, useState, useEffect } from 'react';
import styles from './Home.module.scss';
import { CurrencyItem, Dropdown, Error } from '../../components';
import { ICurrency } from '../../interfaces/currencies';
import { useCurrencyConverter } from '../../utils/hook/useCurrencyConverter';
import {
   addCurrencyToSelected,
   getSelectedCurrencies,
   removeCurrencyFromSelected,
} from '../../utils/localStorage';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { ResetState } from '../../redux/currencies/currenciesSlice';

export const Home: FC = () => {

   const dispatch = useAppDispatch();

   const loading = useAppSelector((state) => state.currencies.status === 'loading');
   const error = useAppSelector((state) => state.currencies.error);

   const { currencies, inputValues, handleInputChange } = useCurrencyConverter();
   const [selectedCurrencies, setSelectedCurrencies] = useState<number[]>([]);
   const [currenciesLoaded, setCurrenciesLoaded] = useState(false);

   useEffect(() => {
      const storedCurrencies = getSelectedCurrencies();
      setSelectedCurrencies(storedCurrencies);
      return () => {
         dispatch(ResetState());
      };
   }, [dispatch]);

   useEffect(() => {
      if (currencies.length > 0) {
         setCurrenciesLoaded(true);
      }
   }, [currencies]);

   const handleAddCurrency = (currencyId: number) => {
      removeCurrencyFromSelected(currencyId);
      setSelectedCurrencies((prevSelectedCurrencies) =>
         prevSelectedCurrencies.filter((id) => id !== currencyId)
      );
   };

   const handleRemoveCurrency = (currencyId: number) => {
      addCurrencyToSelected(currencyId);
      setSelectedCurrencies((prevSelectedCurrencies) => [...prevSelectedCurrencies, currencyId]);
   };

   if (error) return <Error error={error} />

   return (
      <div className={styles.home}>
         <h1 className={styles.title}>Currency Converter</h1>
         {loading ? (
            <div>Loading...</div>
         ) : (
            <main className={styles.content}>
               {currenciesLoaded && currencies?.filter((currency: ICurrency) => !selectedCurrencies?.
                  includes(currency.id))?.
                  map((currency: ICurrency) => (
                     <CurrencyItem
                        key={currency.id}
                        currency={currency}
                        inputValue={inputValues[currency.name]}
                        onInputChange={handleInputChange}
                        onRemove={handleRemoveCurrency} />
                  ))}
               {currenciesLoaded && (
                  <Dropdown
                     options={currencies?.
                        filter((currency: ICurrency) =>
                           selectedCurrencies?.
                              includes(currency.id))?.
                        map((currency: ICurrency) => ({
                           id: currency.id,
                           name: currency.name,
                        }))}
                     onSelect={(selectedOption: { id: number; name: string }) => handleAddCurrency(selectedOption.id)}
                  >
                     Add currency
                  </Dropdown>
               )}
            </main>
         )}
      </div>
   );
}
