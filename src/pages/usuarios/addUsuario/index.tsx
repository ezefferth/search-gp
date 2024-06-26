import { Box, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../data/context/dataContext";
import { LerUsuarios } from "../../../data/fetchData/fetchUsuario/lerUsuarios";
import { InserirUsuario } from "../../../data/fetchData/fetchUsuario/inserirUsuario";
import { SelectChangeEvent } from '@mui/material/Select';
import { LerAcessos } from "../../../data/fetchData/fetchAcessos/lerAcessos";

type Props = {
  openAdd: boolean
  setOpenAdd: (value: boolean) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
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

  const [fk_setor, setFk_setor] = useState<string>('');
  const [fk_secretaria, setFk_secretaria] = useState<string>('');

  const [vinculo, setVinculo] = useState<string>('')
  const [cargo, setCargo] = useState<string>('')

  const handleChangeVin = (event: SelectChangeEvent) => {
    setVinculo(event.target.value as string);
    console.log((event.target.value as string))
  };
  const handleChangeSec = (event: SelectChangeEvent) => {
    setFk_secretaria(event.target.value as string);
  };
  const handleChangeSet = (event: SelectChangeEvent) => {
    setFk_setor(event.target.value as string);
  };

  const handleCancelar = () => {
    setOpenAdd(false)
    setFk_setor('')
    setFk_secretaria('')
    setNome('')
  }



  const { setUsuarios, setores, setAcessos, secretarias } = useContext(DataContext)
  const [nome, setNome] = useState<string>("")
  const [nome_login, setNome_login] = useState<string>("")




  const handleAddUsuario = async () => {
    try {
      if (nome.length >= 4 &&
        nome_login.length >= 4 &&
        fk_setor.length >= 4 &&
        vinculo.length >= 4 &&
        cargo.length >= 3
      ) {
        console.log('sim')
        await InserirUsuario({ nome, nome_login, fk_setor, vinculo, cargo })
        setOpenAdd(false)
        setFk_setor('')
        setNome('')
        setNome_login('')
        LerUsuarios({ setUsuarios })
        LerAcessos({ setAcessos })
      } else {
        window.alert("Favor digitar o nome do setor corretamente!");
      }
    } catch (e: any) {
      console.log(e.response?.request?.status);
      setOpenAdd(false);
      setNome('')
      setNome_login('')
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
            value={nome}
            onChange={(e) => setNome(e.target.value.toUpperCase())}
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
            <InputLabel id="demo-simple-select-label">Vínculo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={vinculo}
              label="Vínculo"
              onChange={handleChangeVin}
              sx={{ textAlign: 'left' }}
            >
              <MenuItem value='Comissionado'>Comissionado</MenuItem>
              <MenuItem value='Estagiário'>Estagiário</MenuItem>
              <MenuItem value='Servidor'>Efetivo</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ mt: 2 }}
            id="standard-search"
            label="Cargo"
            type="text"
            variant="standard"
            fullWidth
            onChange={(e) => setCargo(e.target.value)}
          />
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }} size="small">
            <InputLabel id="demo-simple-select-label">Secretaria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fk_secretaria}
              label="Setor"
              onChange={handleChangeSec}
              sx={{ textAlign: 'left' }}
            >
              {
                secretarias?.map((secretaria) => {
                  return (
                    <MenuItem key={secretaria.id} value={secretaria.id}>{secretaria.nome}</MenuItem>
                  )
                })
              }
            </Select>
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }} size="small">
            <InputLabel id="demo-simple-select-label">Setor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fk_setor}
              label="Setor"
              onChange={handleChangeSet}
              sx={{ textAlign: 'left' }}
            >
              {
                setores?.map((setor) => {
                  if (fk_secretaria == setor.fk_secretaria)
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
