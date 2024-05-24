import { Outlet } from "react-router-dom";
import NavbarMain from "./navbarMain";





export default function Main() {
  return (
    <div>
      <NavbarMain />
      <Outlet />
    </div>
  )
}
