import { FC } from "react";
import styles from "./Table.module.scss";



interface DynamicTableProps {
   data: any[];
   columns: { title: string; onClick: () => void }[];
}

export const Table: FC<DynamicTableProps> = ({ data, columns }) => {
   return (
      <table className={styles.table}>
         <thead>
            <tr>
               {columns.map((column, index) => (
                  <th key={index} onClick={column.onClick}>
                     {column.title}
                  </th>
               ))}
            </tr>
         </thead>
         <tbody>
            {data.map((item, itemIndex) => (
               <tr key={itemIndex}>
                  {columns.map((column, columnIndex) => (
                     <td key={columnIndex}>{item[column.title]}</td>
                  ))}
               </tr>
            ))}
         </tbody>
      </table>
   );
};
