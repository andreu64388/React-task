import { FC } from "react";
import styles from "./Header.module.scss"
import { Container } from "../Container";
import { Link } from "react-router-dom";

export const Header: FC = () => {
   return (
      <header className={styles.header}>
         <Container>
            <div className={styles.content}>
               <Link className={styles.logo} to="/">Home page</Link>
               <Link className={styles.logo} to="/list">List page</Link>
            </div>
         </Container>
      </header>
   )
}