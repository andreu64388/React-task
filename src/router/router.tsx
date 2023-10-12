import { Provider } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { Error, Home, List } from "../pages";
import store from "../redux/store";
import { App } from "../App";

export const routerConfig = createBrowserRouter([
   {
      path: "/",
      element: <Provider store={store}><App /> </Provider>,
      errorElement: <Error />,
      children: [
         {
            path: "/",
            element: <Home />,

         },
         {
            path: "/list",
            element: <List />,
         },

      ],
   },
]);