import React, { FC } from 'react';
import styles from './Input.module.scss';

interface InputProps {
   value: string;
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
   onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
   onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ value, onChange, onFocus, onBlur }) => {
   return (
      <input
         type="text"
         className={styles.input}
         value={value}
         onChange={onChange}
         onFocus={onFocus}
         onBlur={onBlur}
      />
   );
};

export default Input;
