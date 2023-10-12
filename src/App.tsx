import { Outlet } from "react-router-dom";
import { LayoutMain } from "./Layout";
import { FC } from "react";


export const App: FC = () => {
  return (
    <LayoutMain>
      <Outlet />
    </LayoutMain>
  )
}

