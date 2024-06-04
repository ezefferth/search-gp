import { useContext, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
import AddSetor from "./addGrupo";
import EditarGrupo from "./editarGrupo";
import { Grupo } from "../../data/dataTypes";
import { FaEllipsisV } from "react-icons/fa";

export default function Grupos() {
  const { grupos } = useContext(DataContext);
  const [nome, setNome] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [grupo, setGrupo] = useState<Grupo>();
  const [check, setCheck] = useState<boolean>(false);
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null);

  const handleEdit = (grupo: Grupo) => {
    setNome(grupo.nome);
    setGrupo(grupo);
    setCheck(false);
    setSelectedGrupo(grupo);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  const handleClickOutside = (e: any) => {
    if (!e.target.closest('.grupo-item')) {
      setSelectedGrupo(null);
    }
  };

  return (
    <div className="grid justify-center mt-8" onClick={handleClickOutside}>
      <div className="w-[45rem] border-x border-blue-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between px-4">
          <span className="content-center font-semibold">Grupos</span>
          <button onClick={() => setOpenAdd(true)}>
            <IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" />
          </button>
        </div>
        <div className="pt-4">
          {grupos?.map((grupo) => {
            const isSelected = selectedGrupo?.id === grupo.id;
            return (
              <div
                key={grupo.id}
                className={`grupo-item cursor-pointer text-sm mx-4 ${
                  isSelected ? 'font-bold ml-5' : 'hover:font-bold hover:ml-5 hover:transition-all'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEdit(grupo);
                }}
              >
                <div className="flex justify-between py-1">
                  <span>{grupo.nome}</span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(grupo);
                  }}>
                    <FaEllipsisV className={`text-blue-950 opacity-50 ${isSelected ? 'opacity-100' : 'hover:opacity-100'} content-center hover:brightness-90 hover:transition-all`} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <EditarGrupo open={open} setOpen={setOpen} grupo={grupo} nome={nome} setNome={setNome} check={check} setCheck={setCheck} />
      <AddSetor openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  );
}
