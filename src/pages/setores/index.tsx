import { useContext, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
import { FaEdit } from "react-icons/fa";
import AddSetores from "./addSetores";
import EditSetores from "./editarSetores";
import { Setor } from "../../data/dataTypes";


export default function Setores() {

  const { setores } = useContext(DataContext)
  const [nome, setNome] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [openAdd, setOpenAdd] = useState<boolean>(false)
  const [setor, setSetor] = useState<Setor>()
  const [check, setCheck] = useState<boolean>(false)
  const [checkSec, setCheckSec] = useState<boolean>(false)

  const handleEdit = (setor: Setor) => {
    setNome(setor.nome)
    setSetor(setor)
    setCheck(false)
    setCheckSec(false)
    setTimeout(() => {
      setOpen(true)

    }, 100)
  }

  return (
    <div className="grid justify-center mt-8">
      <div className="w-[45rem] border-x border-blue-900">
        <div className="flex  justify-between px-4">
          <span className="content-center font-semibold">Setores</span>
          <button onClick={() => setOpenAdd(true)}><IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" /></button>
        </div>
        <div className="pt-4">
          {
            setores?.map((setor) => {
              return (
                <div key={setor.id} className="cursor-pointer font-normal text-sm hover:font-bold transition-all hover:transition-all hover:ml-5 mx-4">
                  <div className="flex justify-between py-1 ">
                    <span>{setor.nome}</span>
                    <button onClick={() => handleEdit(setor)} ><FaEdit className=" text-blue-950  opacity-50 hover:opacity-100 content-center hover:brightness-90 hover:transition-all" /></button>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
      <EditSetores open={open} setOpen={setOpen} setor={setor} nome={nome} setNome={setNome} check={check} setCheck={setCheck} checkSec={checkSec} setCheckSec={setCheckSec}/>
      <AddSetores openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  )
}
