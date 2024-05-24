import { useContext } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";


export default function Setores() {

  const {setores} = useContext(DataContext)

  return (
    <div className="grid justify-center py-3">
      <div className="w-[45rem] border-x border-blue-900">
        <div className="flex  justify-between px-4">
          <span className="content-center">Setores</span>
          <button onClick={() => console.log(setores)}><IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" /></button>
        </div>
      </div>
    </div>
  )
}
