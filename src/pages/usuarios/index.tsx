import { useContext, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
//import { FaEdit } from "react-icons/fa";
import EditarGrupo from "./editarUsuario";
import { Usuario } from "../../data/dataTypes";
import { FaEllipsisV } from "react-icons/fa";
import { Popover, Typography } from "@mui/material";
import AddUsuario from "./addUsuario";
/* import { FaBuffer } from "react-icons/fa";
import { FaEdit } from "react-icons/fa"; */
export default function Usuarios() {

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUsuario(null)
  };

  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;


  const { usuarios } = useContext(DataContext);
  const [nome, setNome] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Usuario>();
  const [check, setCheck] = useState<boolean>(false);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);



  const handleEdit = (usuario: Usuario) => {
    setNome(usuario.nome);
    setUsuario(usuario);
    setCheck(false);
    setSelectedUsuario(usuario);
    setAnchorEl(null);
    setTimeout(() => {
      setOpen(true);
    }, 100);
  };


  const handleClickOutside = (e: any) => {
    if (!e.target.closest('.grupo-item')) {
      setSelectedUsuario(null);
    }

  };

  return (
    <div className="grid justify-center mt-8" onClick={handleClickOutside}>
      <div className="w-[45rem] border-x border-blue-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between px-4">
          <span className="content-center font-semibold">Usuários</span>
          <button onClick={() => setOpenAdd(true)}>
            <IoAddCircleSharp className="text-2xl text-blue-950 content-center hover:brightness-90 hover:transition-all" />
          </button>
        </div>
        <div className="pt-4">
          {usuarios?.map((usuario) => {
            const isSelected = selectedUsuario?.id === usuario.id;
            return (
              <div
                key={usuario.id}
                className={`grupo-item cursor-pointer text-sm mx-4 ${isSelected ? 'font-bold ml-5 transition-all' : 'hover:font-bold hover:ml-5 hover:transition-all'
                  }`}
              >
                <div className="flex justify-between py-1">
                  <span>{usuario.nome}</span>
                  <button onClick={handleClick}>
                    <FaEllipsisV onClick={() => setSelectedUsuario(usuario)} className={`text-blue-950 opacity-50 ${isSelected ? 'opacity-100' : 'hover:opacity-100'} content-center hover:brightness-90 hover:transition-all`} />
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
                        <button onClick={() => handleEdit(usuario)} className=" hover:bg-slate-100 hover:font-semibold transition-all ">Editar</button>
                      </Typography>
                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {/* <FaBuffer /> */}
                        <button className=" hover:bg-slate-100 hover:font-semibold transition-all">Ações</button>
                      </Typography>
                    </div>
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <EditarGrupo open={open} setOpen={setOpen} usuario={usuario} nome={nome} setNome={setNome} check={check} setCheck={setCheck} />
      <AddUsuario openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  );
}
