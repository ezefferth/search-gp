import { Box, Modal, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { DataContext } from "../../../data/context/dataContext";
import { InserirGrupo } from "../../../data/fetchData/fetchGrupo/inserirGrupo";
import { LerGrupos } from "../../../data/fetchData/fetchGrupo/lerGrupos";


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

export default function AddSetor({ openAdd, setOpenAdd }: Props) {

  const { setGrupos } = useContext(DataContext)
  const [nome, setNome] = useState<string>("")


  const handleOnAddGrupos = () => {
    LerGrupos({ setGrupos })
  }

  const handleAddGrupo = async () => {
    try {
      if (nome.length >= 4) {
        await InserirGrupo({ nome })
        handleOnAddGrupos()
        setOpenAdd(false)
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
        <h2 className="text-center text-xl">Adicionar Grupo</h2>

        <div className="text-center px-4 py-6 ">
          <TextField
            id="standard-search"
            label="Nome do Grupo"
            type="text"
            variant="standard"
            fullWidth
            onChange={(e) => setNome(e.target.value)}
          />
          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={() => setOpenAdd(false)} className="bg-rose-100 px-2 py-1 rounded-lg hover:bg-rose-200 transition-all active:bg-rose-300">Cancelar</button>
            <button onClick={handleAddGrupo} className="bg-blue-100 px-2 py-1 rounded-lg hover:bg-blue-200 transition-all active:bg-blue-300" >Cadastrar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
