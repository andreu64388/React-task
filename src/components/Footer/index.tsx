import { FC } from "react";
import styles from "./Footer.module.scss";
import { Container } from "../Container";


export const Footer: FC = () => {
   return (
      <footer className={styles.footer}>
         <Container>
            <div className={styles.content}>
               <p className={styles.text}>© 2023 Test Application</p>
            </div>
         </Container>
      </footer>
   )
};
