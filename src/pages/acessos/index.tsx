import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"
import { DataContext } from "../../data/context/dataContext";
export default function Acessos() {

  const location = useLocation();
  const navigate = useNavigate();

  const { acessos } = useContext(DataContext)


  useEffect(() => {
    if (location.state == null) {
      navigate(-1)
    }

  }, [])

  return (
    <div className=" grid justify-center mt-8" >
      <div className="w-[45rem] border-x border-blue-900" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between px-4">
          <span className="content-center font-semibold">Acessos</span>
          <span>{location.state.nome}</span>
        </div>

      </div>
    </div>
  )
}










/* import { Box, Modal } from "@mui/material";
import { Grupo } from "../../data/dataTypes";

const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  //border: '1px solid rgb(23 37 84);',
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 0,
};

type Props = {
  grupo: Grupo
  openAcessos: boolean
  setOpenAcessos: (value: boolean) => void
}

export default function ModalAcessos({ openAcessos, setOpenAcessos, grupo }: Props) {
  return (
    <Modal
      open={openAcessos}
      onClose={() => setOpenAcessos(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 className="text-center text-xl">Ações </h2>
        <h2 className="text-center text-sm">{grupo?.nome}</h2>
        

        <div className="text-center px-4 py-6 ">

                    <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={() => setOpenAdd(false)} className="bg-rose-100 px-2 py-1 rounded-lg hover:bg-rose-200 transition-all active:bg-rose-300">Cancelar</button>
            <button onClick={handleAddGrupo} className="bg-blue-100 px-2 py-1 rounded-lg hover:bg-blue-200 transition-all active:bg-blue-300" >Cadastrar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
 */