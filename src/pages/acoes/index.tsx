import { Box, Checkbox, Modal, } from "@mui/material"
import { Acoes, CheckboxAcoesProps, MapAcesso } from "../../data/dataTypes"
import { MapAcoes } from "./mapAcoes"
import { useState } from "react"



type Props = {
  openAcoes: boolean
  setOpenAcoes: (value: boolean) => void
  mapAcesso: MapAcesso
  acoes: Acoes
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

export default function ModalAcoes({ openAcoes, setOpenAcoes, mapAcesso, acoes }: Props) {

  const [checkboxStates, setCheckboxStates] = useState<CheckboxAcoesProps>({
    criar: false,
    editar: false,
    remover: false,
    emitir: false,
    emitirSegVia: false,
    cancelar: false,
    reativar: false,
    manutencao: false,
    estornar: false,
    homologar: false,
    consultar: false,
    transferir: false,
    executar: false,
  });

  const handleCheckboxChange = (name: keyof CheckboxAcoesProps) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };







  return (
    <Modal
      open={openAcoes}
      onClose={() => setOpenAcoes(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: 400 }}>
        <h2 className="text-center text-xl">Ações</h2>

        <h3 className="pt-2 text-center">Editando: {mapAcesso.nome}</h3>

        <div className="text-center px-4 py-6 ">
          {
            MapAcoes.map((item, index) => {
              return (
                <div key={index} className="flex justify-between px-4 h-7 hover:font-semibold hover:pl-5 transition-all hover:transition-all" >
                  <span className="">{item.nome}</span>
                  <div className="flex items-center">
                    <Checkbox
                      sx={{
                        color: '#172554',
                        '&.Mui-checked': {
                          color: '#172554',
                        },
                      }}
                      id={`check-${item.state}`}
                      size="small"
                      checked={checkboxStates[item.state as keyof CheckboxAcoesProps]}
                      onChange={() => handleCheckboxChange(item.state as keyof CheckboxAcoesProps)}
                    />
                  </div>
                </div>
              )
            })
          }
          <div className="flex justify-center gap-2 pt-6 px-8">
            <button onClick={() => setOpenAcoes(false)}
              className="bg-rose-100 px-2 py-1 rounded-lg hover:bg-rose-200 transition-all active:bg-rose-300">Cancelar</button>
            <button className="bg-blue-100 px-2 py-1 rounded-lg hover:bg-blue-200 transition-all active:bg-blue-300" >Atualizar</button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
