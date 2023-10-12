import { FC } from "react";
import styles from "./Container.module.scss"


interface IContainer {
   children: React.ReactNode;
}

export const Container: FC<IContainer> = ({ children }) => {
   return (
      <div className={styles.wrapper}>
         {children}
      </div>
   )
}
