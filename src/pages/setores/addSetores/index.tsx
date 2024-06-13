import { Box, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../data/context/dataContext";
import { LerSetores } from "../../../data/fetchData/fetchSetor/lerSetores";
import { InserirSetor } from "../../../data/fetchData/fetchSetor/inserirSetor";


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

export default function AddSetores({ openAdd, setOpenAdd }: Props) {

  const { setSetores, secretarias } = useContext(DataContext)
  const [nome, setNome] = useState<string>("")

  const [fk_secretaria, setFk_secretaria] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setFk_secretaria(event.target.value as string);
  };


  const handleOnAddSetores = () => {
    LerSetores({ setSetores })
  }

  const handleAddSetores = async () => {
    if (nome.length >= 4)
      try {
        await InserirSetor({ nome, fk_secretaria })
        handleOnAddSetores()
        setOpenAdd(false)
        setNome('')
        setFk_secretaria('')

      } catch (e: any) {
        console.log(e.response?.request?.status);
        setOpenAdd(false);
        setNome('')
        setFk_secretaria('')
      }
    else {
      window.alert("Favor digitar o nome do setor corretamente!")
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
        <h2 className="text-center text-xl">Adicionar Setor</h2>

        <div className="text-center px-4 py-6 ">
          <TextField
            id="standard-search"
            label="Nome do Setor"
            type="text"
            variant="standard"
            fullWidth
            //value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
          <FormControl variant="standard" fullWidth sx={{ mt: 2 }} size="small">
            <InputLabel id="demo-simple-select-label">Secretaria</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={fk_secretaria}
              label="Secretaria"
              onChange={handleChange}
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
          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={() => setOpenAdd(false)} className="bg-rose-100 px-2 py-1 rounded-lg hover:bg-rose-200 transition-all active:bg-rose-300">Cancelar</button>
            <button onClick={handleAddSetores} className="bg-blue-100 px-2 py-1 rounded-lg hover:bg-blue-200 transition-all active:bg-blue-300" >Cadastrar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
