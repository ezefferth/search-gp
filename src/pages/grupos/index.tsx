import { useContext, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
import { FaEdit } from "react-icons/fa";
import AddSetor from "./addGrupo";
import EditarGrupo from "./editarGrupo";
import { Grupo } from "../../data/dataTypes";


export default function Grupos() {

  const { grupos } = useContext(DataContext)
  const [nome, setNome] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [grupo, setGrupo] = useState<Grupo>()
  const [check, setCheck] = useState<boolean>(false)

  const handleEdit = (grupo: Grupo) => {
    setNome(grupo.nome)
    setGrupo(grupo)
    setCheck(false)
    setTimeout(() => {
      setOpen(true)
    }, 100)
  }

  return (
    <div className="grid justify-center mt-8">
      <div className="w-[45rem] border-x border-blue-900">
        <div className="flex  justify-between px-4">
          <span className="content-center font-semibold">Grupos</span>
          <button onClick={() => setOpenAdd(true)}><IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" /></button>
        </div>
        <div className="pt-4">
          {
            grupos?.map((grupo) => {
              return (
                <div key={grupo.id} className="cursor-pointer font-normal text-sm hover:font-bold hover:transition-all hover:ml-5 mx-4">
                  <div className="flex justify-between py-1 ">
                    <span>{grupo.nome}</span>
                    <button onClick={() => handleEdit(grupo)} ><FaEdit className=" text-blue-950  opacity-50 hover:opacity-100 content-center hover:brightness-90 hover:transition-all" /></button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <EditarGrupo open={open} setOpen={setOpen} grupo={grupo} nome={nome} setNome={setNome} check={check} setCheck={setCheck} />
      <AddSetor openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  )
}
