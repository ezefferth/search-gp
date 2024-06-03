import { Box, Checkbox, FormControlLabel, Modal, TextField } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../../data/context/dataContext";
import { LerSetores } from "../../../data/fetchData/fetchSetor/lerSetores";

import { Setor } from "../../../data/dataTypes";
import { AtualizarSetor } from "../../../data/fetchData/fetchSetor/atualizarSetor";
import { DeletarSetor } from "../../../data/fetchData/fetchSetor/deletarSetor";


type Props = {
  open: boolean
  setOpen: (value: boolean) => void
  setor?: Setor
  nome: string
  setNome: (value: string) => void
  check: boolean
  setCheck: (value: boolean) => void
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

export default function EditSetores({ open, setOpen, setor, nome, setNome, check, setCheck }: Props) {

  const { setSetores } = useContext(DataContext)
  /*   const [nome, setNome] = useState<String>('') */


  const handleOnEditSetores = () => {
    LerSetores({ setSetores })
  }

  const handleEditSetor = async () => {
    try {
      const id = setor!.id;
      if (nome.length >= 4) {
        await AtualizarSetor({ id, nome })
        handleOnEditSetores()
        setOpen(false)
      } else {
        window.alert("Favor digitar o nome do setor corretamente!");
      }
    } catch (e: any) {
      console.log(e.response?.request?.status);
      setOpen(false);
    }
  }

  const handleDeleteSetor = async () => {
    try {
      const id = setor!.id;
      await DeletarSetor({ id })
      handleOnEditSetores()
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
        <h2 className="text-center text-xl">Editar Setor</h2>

        <div className="text-center px-4 py-6 ">
          <div className="flex content-center">
            <FormControlLabel control={<Checkbox checked={check} onClick={() => setCheck(!check)} />} label="" />
            <TextField
              id="standard-search"
              label='Setor'
              type="text"
              defaultValue={setor?.nome}
              variant="standard"
              fullWidth
              onChange={(e) => setNome(e.target.value.toUpperCase())}
              inputProps={{ style: { textTransform: "uppercase" } }}
              disabled={!check}
            />
          </div>

          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={handleDeleteSetor} className="bg-red-300 px-2 py-1 rounded-lg hover:bg-red-400 transition-all active:bg-red-500">Remover</button>
            <button onClick={() => setOpen(false)} className="bg-rose-200 px-2 py-1 rounded-lg hover:bg-rose-300 transition-all active:bg-rose-400">Cancelar</button>
            <button onClick={handleEditSetor} className="bg-blue-200 px-2 py-1 rounded-lg hover:bg-blue-300 transition-all active:bg-blue-400" >Atualizar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
