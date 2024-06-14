import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/main";
import VisaoGeral from "../pages/visaoGeral";
import Grupos from "../pages/grupos";
import Usuarios from "../pages/usuarios";
import Setores from "../pages/setores";
import AcessosHook from "../pages/acessos";
import Secretarias from "../pages/secretarias";




export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} >
          <Route path="/visaoGeral" element={<VisaoGeral />} />
          <Route path="/grupos" element={<Grupos />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/setores" element={<Setores />} />
          <Route path="/acessos" element={<AcessosHook />} />
          <Route path="/secretarias" element={<Secretarias />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
