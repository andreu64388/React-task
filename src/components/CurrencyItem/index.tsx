import { FC, ChangeEvent } from 'react';
import styles from './CurrencyItem.module.scss';
import Input from '../Input';

interface CurrencyItemProps {
   currency: {
      id: number;
      name: string;
   };
   inputValue: string;
   onInputChange: (name: string, value: string) => void;
   onRemove: (id: number) => void;
}

export const CurrencyItem: FC<CurrencyItemProps> = ({ currency, inputValue, onInputChange, onRemove }) => {
   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      onInputChange(currency.name, event.target.value);
   };

   return (
      <div className={styles.block}>
         <p className={styles.block__name}>{currency.name}</p>
         <Input value={inputValue} onChange={handleInputChange} />
         <button className={styles.block__button} onClick={() => onRemove(currency.id)}>
            ✖
         </button>
      </div>
   );
};

