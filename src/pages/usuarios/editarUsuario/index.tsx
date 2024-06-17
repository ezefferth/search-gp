import { Box, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useContext, useEffect, useState } from "react";
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
  vinculo: string
  setVinculo: (value: string) => void
  cargo: string
  setCargo: (value: string) => void
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  bgcolor: 'background.paper',
  border: '1px solid rgb(23 37 84);',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 0,
};

export default function EditarGrupo({ open, setOpen, usuario, nome, setNome, nome_login, setNome_login, vinculo, setVinculo, cargo, setCargo }: Props) {

  const { setUsuarios, secretarias, setores } = useContext(DataContext)

  const [check, setCheck] = useState<boolean>(false);
  const [check_login, setCheck_login] = useState<boolean>(false);
  const [check_vinculo, setCheck_vinculo] = useState<boolean>(false);
  const [check_cargo, setCheck_cargo] = useState<boolean>(false);
  const [check_secretaria, setCheck_secretaria] = useState<boolean>(false);
  const [check_setor, setCheck_setor] = useState<boolean>(false);


  const [fk_setor, setFk_setor] = useState<string>('');
  const [fk_secretaria, setFk_secretaria] = useState<string>('');



  const handleChangeSec = (event: SelectChangeEvent) => {
    setFk_secretaria(event.target.value as string);
  };

  const handleChangeSet = (event: SelectChangeEvent) => {
    setFk_setor(event.target.value as string);
  };

  const handleChangeVin = (event: SelectChangeEvent) => {
    setVinculo(event.target.value as string);
    console.log((event.target.value as string))
  };

  const handleFechar = () => {
    setOpen(false)
    setCheck(false)
    setCheck_login(false)
    setCheck_vinculo(false)
    setCheck_cargo(false)
    setCheck_secretaria(false)
    setCheck_setor(false)
  }

  useEffect(() => {
    if (usuario) {
      const setorUsuario = setores?.find(setor => setor.id === usuario.fk_setor);
      if (setorUsuario) {
        setFk_setor(setorUsuario.id);
        const secretariaUsuario = secretarias?.find(sec => sec.id === setorUsuario.fk_secretaria);
        if (secretariaUsuario) {
          setFk_secretaria(secretariaUsuario.id);
        }
      }
    }
  }, [secretarias, open])

  const handleOnEditarUsuario = () => {
    LerUsuarios({ setUsuarios })
  }


  const handleEditarUsuario = async () => {
    try {
      const id = usuario!.id;
      if (nome.length >= 4) {
        await AtualizarUsuario({ id, nome, nome_login, vinculo, cargo, fk_setor })
        handleOnEditarUsuario()
        handleFechar()
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
      onClose={handleFechar}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 450 }}>
        <h2 className="text-center text-xl">Usuário</h2>

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
          <div className="flex content-center pt-2">
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
          <div className="flex content-center pt-2">
            <FormControlLabel control={<Checkbox checked={check_vinculo} onClick={() => setCheck_vinculo(!check_vinculo)} />} label="" />
            <FormControl variant="standard" fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Vínculo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={usuario?.vinculo}
                label="Vínculo"
                onChange={handleChangeVin}
                sx={{ textAlign: 'left' }}
                disabled={!check_vinculo}
              >
                <MenuItem value='Comissionado'>Comissionado</MenuItem>
                <MenuItem value='Efetivo'>Efetivo</MenuItem>
                <MenuItem value='Estagiário'>Estagiário</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex content-center pt-2">
            <FormControlLabel control={<Checkbox checked={check_cargo} onClick={() => setCheck_cargo(!check_cargo)} />} label="" />
            <TextField
              //sx={{ mt: 2 }}
              id="standard-search"
              label='Cargo'
              type="text"
              defaultValue={usuario?.cargo}
              variant="standard"
              fullWidth
              onChange={(e) => setCargo(e.target.value)}
              /* inputProps={{ style: { textTransform: "uppercase" } }} */
              disabled={!check_cargo}
            />
          </div>
          <div className="flex content-center pt-2">
            <FormControlLabel control={<Checkbox checked={check_secretaria} onClick={() => setCheck_secretaria(!check_secretaria)} />} label="" />
            <FormControl variant="standard" fullWidth size="small">
              <InputLabel id="demo-simple-select-label">Secretaria</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fk_secretaria}
                label="Secretaria"
                onChange={handleChangeSec}
                sx={{ textAlign: 'left' }}
                disabled={!check_secretaria}
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

          </div>

          <div className="flex content-center pt-2">
            <FormControlLabel control={<Checkbox checked={check_setor} onClick={() => setCheck_setor(!check_setor)} />} label="" />
            <FormControl variant="standard" fullWidth sx={{ mt: 2 }} size="small">
              <InputLabel id="demo-simple-select-label">Setor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={fk_setor || ''}
                label="Setor"
                onChange={handleChangeSet}
                sx={{ textAlign: 'left' }}
                disabled={!check_setor}
              >
                {
                  setores?.map((setor) => {
                    if (fk_secretaria == setor.fk_secretaria)
                      return (
                        <MenuItem key={setor.id} value={setor.id}>{setor.nome}</MenuItem>
                      )
                    else {
                      return null
                    }
                  })
                }
              </Select>
            </FormControl>

          </div>



          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={handleDeletarUsuario} className="bg-red-300 px-2 py-1 rounded-lg hover:bg-red-400 transition-all active:bg-red-500">Remover</button>
            <button onClick={handleFechar} className="bg-rose-200 px-2 py-1 rounded-lg hover:bg-rose-300 transition-all active:bg-rose-400">Cancelar</button>
            <button onClick={handleEditarUsuario} className="bg-blue-200 px-2 py-1 rounded-lg hover:bg-blue-300 transition-all active:bg-blue-400" >Atualizar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
