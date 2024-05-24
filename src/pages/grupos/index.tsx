
import { IoAddCircleSharp } from "react-icons/io5"
export default function Grupos() {
  return (
    <div className="grid justify-center py-3">
      <div className="w-[45rem] border-x border-blue-900">
        <div className="flex  justify-between px-4">
          <span className="content-center">Grupos</span>
          <button><IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" /></button>
        </div>
      </div>

    </div>
  )
}
