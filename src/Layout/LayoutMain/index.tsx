import { FC } from "react";
import { Container, Footer, Header } from "../../components";
import styles from "./LayoutMain.module.scss"
interface ILayoutMain {
   children?: React.ReactNode;
}

export const LayoutMain: FC<ILayoutMain> = ({ children }) => {
   return (
      <div>
         <Header />
         <Container>
            <main className={styles.main}>
               {children}
            </main>
         </Container>
         <Footer />
      </div>
   )
}