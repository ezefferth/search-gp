import { useContext, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
import AddSetor from "./addGrupo";
import EditarGrupo from "./editarGrupo";
import { Grupo } from "../../data/dataTypes";
import { FaEllipsisV } from "react-icons/fa";
import { Popover, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

/* import ModalAcessos from "../acessos"; */

export default function Grupos() {

  const navigate = useNavigate()

  const { grupos } = useContext(DataContext);
  const [nome, setNome] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  /* const [openAcessos, setOpenAcessos] = useState<boolean>(false); */
  const [grupo, setGrupo] = useState<Grupo>();
  const [check, setCheck] = useState<boolean>(false);
  const [selectedGrupo, setSelectedGrupo] = useState<Grupo | null>(null);



  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, grupo: Grupo) => {
    setAnchorEl(event.currentTarget);
    setSelectedGrupo(grupo);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;

  const handleEdit = (grupo: Grupo) => {
    setNome(grupo.nome);
    setGrupo(grupo);
    setCheck(false);
    //setSelectedGrupo(grupo);
    setAnchorEl(null);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };

  /*   const handleAcessos = (grupo: Grupo) => {
      setGrupo(grupo);
      //setCheck(true);
      setAnchorEl(null);
      setTimeout(() => {
        setOpenAcessos(true);
      }, 100);
    } */



  const handleClickOutside = (e: any) => {
    if (!e.target.closest('.grupo-item')) {
      setSelectedGrupo(null);
    }
  };

  return (
    <div className=" grid justify-center mt-8" onClick={handleClickOutside}>
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
                className={`grupo-item cursor-pointer text-sm mx-4 ${isSelected ? 'font-bold ml-5' : 'hover:font-bold hover:ml-5 hover:transition-all transition-all'
                  }`}
              >
                <div className="flex justify-between py-1">
                  <span>{grupo.nome}</span>
                  <button onClick={(e) => {
                    e.stopPropagation();
                    handleClick(e, grupo);
                  }}>
                    <FaEllipsisV className={`text-blue-950 ${isSelected ? 'opacity-100' : 'opacity-50'} content-center hover:opacity-100 transition-all hover:brightness-90 hover:transition-all`} />
                  </button>
                  <Popover
                    id={id}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                  >
                    <div className="justify-center w-20 py-2">

                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <FaEdit /> */}
                        <button onClick={() => handleEdit(selectedGrupo!)} className=" hover:bg-slate-100 hover:font-semibold transition-all ">Editar</button>
                      </Typography>
                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <FaBuffer /> */}
                        <button onClick={() => navigate('/acessos', { state: selectedGrupo! })} className=" hover:bg-slate-100 hover:font-semibold transition-all">Acessos</button>
                      </Typography>
                    </div>
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <EditarGrupo open={open} setOpen={setOpen} grupo={grupo} nome={nome} setNome={setNome} check={check} setCheck={setCheck} />
      <AddSetor openAdd={openAdd} setOpenAdd={setOpenAdd} />
      {/* <ModalAcessos openAcessos={openAcessos} setOpenAcessos={setOpenAcessos} grupo={grupo!}/> */}
    </div>
  );
}
