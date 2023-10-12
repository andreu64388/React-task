import React, { FC, useState, useEffect, useRef } from 'react';
import styles from './Dropdown.module.scss';

interface DropdownProps {
   options: IOption[];
   onSelect: (value: IOption) => void;
   children?: React.ReactNode;
}

interface IOption {
   id: number;
   name: string;
}

export const Dropdown: FC<DropdownProps> = ({ options, onSelect, children }) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const [selectedOption, setSelectedOption] = useState<IOption | undefined>();
   const dropdownRef = useRef<HTMLDivElement | null>(null);


   const toggleDropdown = () => {
      setIsOpen(!isOpen);
   };

   const handleOptionClick = (option: IOption) => {
      setSelectedOption(option);
      onSelect(option);
      setIsOpen(false);
   };

   const closeDropdown = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
         setIsOpen(false);
      }
   };

   useEffect(() => {
      document.addEventListener('mousedown', closeDropdown);
      return () => {
         document.removeEventListener('mousedown', closeDropdown);
      };
   }, []);

   return (
      <div className={styles.dropdownContainer} ref={dropdownRef}>
         <button className={styles.addButton} onClick={toggleDropdown}>
            {children}
         </button>
         {isOpen && (
            <div className={styles.dropdown}>
               {options?.length > 0 ? (
                  options.map((option) => (
                     <div
                        key={option.id}
                        className={styles.option}
                        onClick={() => handleOptionClick(option)}
                     >
                        {option.name}
                     </div>
                  ))
               ) : (
                  <div className={styles.option}>
                     Not a elements
                  </div>
               )}
            </div>
         )}
      </div>
   );
};
