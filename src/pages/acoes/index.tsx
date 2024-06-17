import { Box, Checkbox, IconButton, Modal, } from "@mui/material"
import { Acessos, Acoes, CheckboxAcoesStates, MapAcesso } from "../../data/dataTypes"
import { MapAcoes } from "./mapAcoes"
import { useContext, useEffect, useState } from "react"
import { AtualizarAcoes } from "../../data/fetchData/fetchAcoes/atualizarAcoes"
import { DataContext } from "../../data/context/dataContext"
import { LerAcoes } from "../../data/fetchData/fetchAcoes/lerAcoes"
import { IoCloseSharp } from "react-icons/io5";


type Props = {
  openAcoes: boolean
  setOpenAcoes: (value: boolean) => void
  mapAcesso: MapAcesso
  acoes: Acoes
  acesso: Acessos
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

export default function ModalAcoes({ openAcoes, setOpenAcoes, mapAcesso, acoes, acesso }: Props) {

  const { setAcoes } = useContext(DataContext)

  const [acessoAlterado, setAcessoAlterado] = useState<boolean>(false)

  const [originalCheckboxStates, setOriginalCheckboxStates] = useState<CheckboxAcoesStates | null>(null);

  const [checkboxStates, setCheckboxStates] = useState<CheckboxAcoesStates>({
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

  useEffect(() => {
    if (acoes) {
      if (acoes.fk_acessos === acesso.id)
        setCheckboxStates((prevState) => ({
          ...prevState,
          criar: acoes.criar!,
          editar: acoes.editar!,
          remover: acoes.remover!,
          emitir: acoes.emitir!,
          emitirSegVia: acoes.emitirSegVia!,
          cancelar: acoes.cancelar!,
          reativar: acoes.reativar!,
          manutencao: acoes.manutencao!,
          estornar: acoes.estornar!,
          homologar: acoes.homologar!,
          consultar: acoes.consultar!,
          transferir: acoes.transferir!,
          executar: acoes.executar!,
        }))
      setOriginalCheckboxStates({ ...checkboxStates });
    }
  }, [acoes])

  useEffect(() => {
    if (originalCheckboxStates) {
      const hasChanged = Object.keys(checkboxStates)
        .some(key => checkboxStates[key as keyof CheckboxAcoesStates] !== originalCheckboxStates[key as keyof CheckboxAcoesStates]);
      setAcessoAlterado(hasChanged);
    }
  }, [checkboxStates, originalCheckboxStates]);

  const handleCancelarAtualizarAcoes = () => {
    setAcessoAlterado(false);
    setOpenAcoes(false);
    if (originalCheckboxStates) {
      setCheckboxStates(originalCheckboxStates);
    }
  };

  const handleCheckboxChange = (name: keyof CheckboxAcoesStates) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  const handleOnEditarAcoes = () => {
    LerAcoes({ setAcoes })
  }

  const handleAtualizarAcoes = async (acoes: Acoes, acoesAtualizados: CheckboxAcoesStates) => {
    try {
      await AtualizarAcoes({ acoes, acoesAtualizados });
      handleOnEditarAcoes();
      setOriginalCheckboxStates(acoesAtualizados);
      setOpenAcoes(false);
      //setAcessoAlterado(false);
    } catch (e: any) {
      console.log(e.response?.request?.status);
    }
  };

  return (
    <Modal
      open={openAcoes}
      onClose={handleCancelarAtualizarAcoes}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >

      <Box sx={{ ...style, width: 400 }}>
        <IconButton
          aria-label="close"
          onClick={handleCancelarAtualizarAcoes}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: '#172554',
          }}
        >
          <IoCloseSharp />
        </IconButton>
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
                      checked={checkboxStates[item.state as keyof CheckboxAcoesStates]}
                      onChange={() => handleCheckboxChange(item.state as keyof CheckboxAcoesStates)}
                    />
                  </div>
                </div>
              )
            })
          }
          <div className="flex justify-center gap-2 pt-6 px-8">
            <button
              onClick={handleCancelarAtualizarAcoes}
              disabled={!acessoAlterado}
              className={`${!acessoAlterado && 'opacity-50 cursor-not-allowed'} bg-red-600 py-1 px-2 rounded-[0.3rem] text-[#fff] hover:opacity-80 transition-all hover:transition-all active:opacity-95`}>
              Cancelar
            </button>
            <button
              disabled={!acessoAlterado}
              onClick={() => handleAtualizarAcoes(acoes, checkboxStates)}
              className={`${!acessoAlterado && 'opacity-50 cursor-not-allowed'} bg-blue-950 py-1 px-2 rounded-[0.3rem] text-[#fff] hover:opacity-80 transition-all hover:transition-all active:opacity-95`}>
              Atualizar
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}
