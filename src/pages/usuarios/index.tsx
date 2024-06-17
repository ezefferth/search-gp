import { useContext, useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { DataContext } from "../../data/context/dataContext";
import EditarGrupo from "./editarUsuario";
import { Usuario } from "../../data/dataTypes";
import { FaEllipsisV } from "react-icons/fa";
import { Popover, Typography } from "@mui/material";
import AddUsuario from "./addUsuario";
import { useNavigate } from "react-router-dom";

export default function Usuarios() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const [selectedUsuario, setSelectedUsuario] = useState<Usuario | null>(null);
  const { usuarios } = useContext(DataContext);
  const [nome, setNome] = useState<string>('');
  const [nome_login, setNome_login] = useState<string>('');
  const [vinculo, setVinculo] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false);
  const [openAdd, setOpenAdd] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<Usuario>();
  const navigate = useNavigate()


  const { acessos } = useContext(DataContext)


  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, usuario: Usuario) => {
    setAnchorEl(event.currentTarget);
    setSelectedUsuario(usuario);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedUsuario(null);
  };



  const openPopover = Boolean(anchorEl);
  const id = openPopover ? 'simple-popover' : undefined;


  useEffect(() => {

  }, [open])

  const handleEdit = (usuario: Usuario) => {
    setNome(usuario.nome);
    setUsuario(usuario);
    setVinculo(usuario.vinculo)
    setCargo(usuario.cargo)
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

  const handleAcessos = (usuario: Usuario) => {
    acessos?.map((acesso) => {
      if (acesso.fk_usuario === usuario.id) {
        setTimeout(() => {
          navigate('/acessos', { state: { usuario, acesso } })
        }, 100);
      }
    })
  }

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
                className={`usuario-item cursor-pointer text-sm mx-4 transition-all ${isSelected ? 'font-bold ml-5' : 'hover:font-bold hover:ml-5'}`}
              >
                <div className="flex justify-between py-1">
                  <span>{usuario.nome}</span>
                  <button onClick={(e) => handleClick(e, usuario)}>
                    <FaEllipsisV className={`text-blue-950 ${isSelected ? 'opacity-100' : 'opacity-50'} content-center hover:opacity-100 hover:transition-all hover:brightness-90 transition-all`} />
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
                    <div className="justify-center w-24 py-2">
                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button onClick={() => handleEdit(selectedUsuario!)} className="hover:bg-slate-100 hover:font-semibold transition-all">
                          Ver
                        </button>
                      </Typography>
                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button
                          onClick={() => handleAcessos(selectedUsuario!)}
                          className="hover:bg-slate-100 hover:font-semibold transition-all">
                          Acessos
                        </button>
                      </Typography>
                      <Typography sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <button className="hover:bg-slate-100 hover:font-semibold transition-all">
                          Grupo(s)
                        </button>
                      </Typography>
                    </div>
                  </Popover>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <EditarGrupo
        open={open}
        setOpen={setOpen}
        usuario={usuario}
        nome_login={nome_login}
        setNome_login={setNome_login}
        nome={nome}
        setNome={setNome}
        vinculo={vinculo}
        setVinculo={setVinculo}
        cargo={cargo}
        setCargo={setCargo}
      />
      <AddUsuario openAdd={openAdd} setOpenAdd={setOpenAdd} />
    </div>
  );
}
