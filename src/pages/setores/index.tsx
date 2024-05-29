import { useContext, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
import { FaEdit } from "react-icons/fa";
import AddSetores from "./addSetores";


export default function Setores() {

  const { setores } = useContext(DataContext)

  const [open, setOpen] = useState<boolean>(false)


  return (
    <div className="grid justify-center mt-8">
      <div className="w-[45rem] border-x border-blue-900">
        <div className="flex  justify-between px-4">
          <span className="content-center font-semibold">Setores</span>
          <button onClick={() => setOpen(true)}><IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" /></button>
        </div>
        <div className="pt-4">
          {
            setores?.map((setor) => {
              return (
                <div className="cursor-pointer font-normal text-sm hover:font-bold hover:transition-all hover:ml-5 mx-4">
                  <div key={setor.id} className="flex justify-between py-1 ">
                    <span>{setor.nome}</span>
                    <button ><FaEdit className=" text-blue-950  opacity-50 hover:opacity-100 content-center hover:brightness-90 hover:transition-all" /></button>
                  </div>
                </div>
              )
            })
          }
        </div>
        <AddSetores open={open} setOpen={setOpen} />
      </div>
    </div>
  )
}
