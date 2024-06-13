import { Box, Checkbox, FormControlLabel, Modal, TextField } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../../data/context/dataContext";
import { Usuario } from "../../../data/dataTypes";
import { LerUsuarios } from "../../../data/fetchData/fetchUsuario/lerUsuarios";
import { AtualizarUsuario } from "../../../data/fetchData/fetchUsuario/atualizarGrupo";
import { DeletarUsuario } from "../../../data/fetchData/fetchUsuario/deletarGrupo";


type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  usuario?: Usuario
  nome: string
  setNome: (value: string) => void
  nome_login: string
  setNome_login: (value: string) => void
  check: boolean
  setCheck: (value: boolean) => void
  check_login: boolean
  setCheck_login: (value: boolean) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid rgb(23 37 84);',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 0,
};

export default function EditarGrupo({ open, setOpen, usuario, nome, setNome, nome_login, setNome_login, check, setCheck, check_login, setCheck_login }: Props) {

  const { setUsuarios } = useContext(DataContext)

  const handleOnEditarUsuario = () => {
    LerUsuarios({ setUsuarios })
  }

  const handleEditarUsuario = async () => {
    try {
      const id = usuario!.id;
      if (nome.length >= 4) {
        await AtualizarUsuario({ id, nome, nome_login })
        handleOnEditarUsuario()
        setOpen(false)
      } else {
        window.alert("Favor digitar o nome do usuario corretamente!");
      }
    } catch (e: any) {
      console.log(e.response?.request?.status);
      setOpen(false);
    }
  }

  const handleDeletarUsuario = async () => {
    try {
      const id = usuario!.id;
      await DeletarUsuario({ id })
      handleOnEditarUsuario()
      setOpen(false)
    } catch (e: any) {
      console.log(e.response?.request?.status);
      setOpen(false);
    }
  }


  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 className="text-center text-xl">Editar Usuário</h2>

        <div className="text-center px-4 py-6 ">
          <div className="flex content-center">
            <FormControlLabel control={<Checkbox checked={check} onClick={() => setCheck(!check)} />} label="" />
            <TextField
              id="standard-search"
              label='Nome'
              type="text"
              defaultValue={usuario?.nome}
              variant="standard"
              fullWidth
              onChange={(e) => setNome(e.target.value.toUpperCase())}
              inputProps={{ style: { textTransform: "uppercase" } }}
              disabled={!check}
            />
          </div>
          <div className="flex content-center">
            <FormControlLabel control={<Checkbox checked={check_login} onClick={() => setCheck_login(!check_login)} />} label="" />
            <TextField
              id="standard-search"
              label='Login'
              type="text"
              defaultValue={usuario?.nome_login}
              variant="standard"
              fullWidth
              onChange={(e) => setNome_login(e.target.value)}
              /* inputProps={{ style: { textTransform: "uppercase" } }} */
              disabled={!check_login}
            />
          </div>

          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={handleDeletarUsuario} className="bg-red-300 px-2 py-1 rounded-lg hover:bg-red-400 transition-all active:bg-red-500">Remover</button>
            <button onClick={() => setOpen(false)} className="bg-rose-200 px-2 py-1 rounded-lg hover:bg-rose-300 transition-all active:bg-rose-400">Cancelar</button>
            <button onClick={handleEditarUsuario} className="bg-blue-200 px-2 py-1 rounded-lg hover:bg-blue-300 transition-all active:bg-blue-400" >Atualizar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
