import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../data/context/dataContext";
import { LerUsuarios } from "../../../data/fetchData/fetchUsuario/lerUsuarios";
import { InserirUsuario } from "../../../data/fetchData/fetchUsuario/inserirUsuario";
import { SelectChangeEvent } from '@mui/material/Select';

type Props = {
  openAdd: boolean
  setOpenAdd: (value: boolean) => void
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

export default function AddUsuario({ openAdd, setOpenAdd }: Props) {

  const [fk_setor, setFk_setor] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFk_setor(event.target.value as string);
  };

  const handleCancelar = () => {
    setOpenAdd(false)
    setFk_setor('')
  }



  const { setUsuarios, setores } = useContext(DataContext)
  const [nome, setNome] = useState<string>("")
  const [nome_login, setNome_login] = useState<string>("")


  const handleOnAddUsuario = () => {
    LerUsuarios({ setUsuarios })
  }

  const handleAddUsuario = async () => {
    try {
      if (nome.length >= 4 && nome_login.length >= 4 && fk_setor.length >= 4) {
        await InserirUsuario({ nome, nome_login, fk_setor })
        handleOnAddUsuario()
        setOpenAdd(false)
        setFk_setor('')
      } else {
        window.alert("Favor digitar o nome do setor corretamente!");
      }
    } catch (e: any) {
      console.log(e.response?.request?.status);
      setOpenAdd(false);
    }
  }

  return (
    <Modal
      open={openAdd}
      onClose={() => setOpenAdd(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 className="text-center text-xl">Adicionar Usuario</h2>

        <div className="text-center px-4 py-6">
          <TextField
            id="standard-search"
            label="Nome do usuario"
            type="text"
            variant="standard"
            fullWidth
            onChange={(e) => setNome(e.target.value.toUpperCase)}
          />
          <TextField
            sx={{ mt: 2 }}
            id="standard-search"
            label="Login do usuario"
            type="text"
            variant="standard"
            fullWidth
            onChange={(e) => setNome_login(e.target.value)}
          />
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }} size="small">
            <InputLabel id="demo-simple-select-label">Setor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fk_setor}
              label="Setor"
              onChange={handleChange}
            >
              {
                setores?.map((setor) => {
                  return (
                    <MenuItem key={setor.id} value={setor.id}>{setor.nome}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={handleCancelar} className="bg-rose-100 px-2 py-1 rounded-lg hover:bg-rose-200 transition-all active:bg-rose-300">Cancelar</button>
            <button onClick={handleAddUsuario} className="bg-blue-100 px-2 py-1 rounded-lg hover:bg-blue-200 transition-all active:bg-blue-300" >Cadastrar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
