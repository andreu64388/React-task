import { FC } from "react";
import { Container, Footer, Header } from "../../components";

interface ILayoutMain {
   children?: React.ReactNode;
}

export const LayoutMain: FC<ILayoutMain> = ({ children }) => {
   return (
      <div>
         <Header />
         <Container>
            <main>
               {children}
            </main>
         </Container>
         <Footer />
      </div>
   )
}