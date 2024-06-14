
import { useLocation, useNavigate } from "react-router-dom"
import { FaUserAstronaut } from "react-icons/fa"


export default function NavbarMain() {

  const location = useLocation()
  const navigate = useNavigate()

  const classSpan = "hover:cursor-pointer hover:transition-all hover:brightness-90 text-center"

  return (
    <header>
      <div className="grid grid-cols-2 bg-blue-900 text-[#fff] h-10 items-center">
        <div className="pl-1 flex max-sm:flex-wrap max-sm:gap-1">
          <span className={`${classSpan} w-28 ${location.pathname === '/visaoGeral' && 'font-semibold'}`} onClick={() => navigate("/visaoGeral")}>Visão Geral</span>
          <span className="px-4 font-thin">|</span>
          <span className={`${classSpan} w-20 ${location.pathname === '/grupos' && 'font-semibold'}`} onClick={() => navigate("/grupos")}>Grupos</span>
          <span className={`${classSpan} w-20 ${location.pathname === '/usuarios' && 'font-semibold'}`} onClick={() => navigate("/usuarios")}>Usuários</span>
          <span className={`${classSpan} w-20 ${location.pathname === '/setores' && 'font-semibold'}`} onClick={() => navigate("/setores")}>Setores</span>
          <span className={`${classSpan} w-20 ${location.pathname === '/secretarias' && 'font-semibold'}`} onClick={() => navigate("/secretarias")}>Secretarias</span>
          {/*  <button onClick={() => console.log(location)}>teste</button> */}
        </div>
        <div className="flex justify-end pr-5">
          <button>
            <FaUserAstronaut className="text-2xl hover:transition-all hover:brightness-90" />
          </button>
        </div>

      </div>


    </header>
  )
}
