import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom"
import { DataContext } from "../../data/context/dataContext";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Checkbox from '@mui/material/Checkbox';
import { HiArrowCircleRight } from "react-icons/hi";
import { MapAcessos } from "./mapAcessos";
import { Acessos, Acoes, CheckboxStates, Grupo, MapAcesso, Usuario } from "../../data/dataTypes";
import { AtualizarAcessos } from "../../data/fetchData/fetchAcessos/atualizarAcessos";
import { LerAcessos } from "../../data/fetchData/fetchAcessos/lerAcessos";
import ModalAcoes from "../acoes";
import { LerAcoes } from "../../data/fetchData/fetchAcoes/lerAcoes";



export default function AcessosHook() {



  const location = useLocation();
  const { grupo, acesso, usuario }: { grupo: Grupo; acesso: Acessos; usuario: Usuario } = location.state || {}

  const { setAcessos, acoes, setAcoes } = useContext(DataContext)

  const [openAcoes, setOpenAcoes] = useState<boolean>(false)

  const [acoesSelected, setAcoesSelected] = useState<Acoes>()

  const [acessoAlterado, setAcessoAlterado] = useState<boolean>(false)
  const [originalCheckboxStates, setOriginalCheckboxStates] = useState<CheckboxStates | null>(null);

  const [mapAcesso, setMapAcesso] = useState<MapAcesso>({
    nome: '',
    state: ''
  })


  const [checkboxStates, setCheckboxStates] = useState<CheckboxStates>({
    agencias: false,
    aliquotas_irrf: false,
    antecipacao_prorrogacao_vencimentos: false,
    arquivo_config: false,
    atos: false,
    bancos: false,
    baixa_automatica: false,
    baixa_manual: false,
    beneficiarios_fiscais: false,
    calculo: false,
    camaras_adicionais: false,
    cancelamento_reativacao_documentos: false,
    cadastro_geral: false,
    cadastros_gerais: false,
    campos_adicionais: false,
    cartorios: false,
    coberturas: false,
    competencias: false,
    condicoes_parcelamento: false,
    configuracao_boletos: false,
    configuracao_cancelamento_boletos: false,
    configuracao_guia_boletos: false,
    configuracao_inscricao_boletos: false,
    configuracao_pagamentos_boletos: false,
    configuracoes_economicas: false,
    configuracoes_imoveis: false,
    configuracoes_notas_avulsas: false,
    configuracoes_receitas_diversas: false,
    construtoras: false,
    contribuicoes_melhoria: false,
    contribuintes: false,
    controle_saldo_devedor: false,
    creditos_tributarios: false,
    declaracao_iss_homologado: false,
    desmembramentos: false,
    documentos: false,
    documentos_config: false,
    economicos: false,
    enderecos: false,
    englobados: false,
    engenheiros: false,
    estorno_inscricao: false,
    feriados: false,
    fontes_divulgacao: false,
    formulas: false,
    geoprocessamento: false,
    geoprocessamento_config: false,
    gerenciador_economico: false,
    guias: false,
    horarios_funcionamento: false,
    imoveis: false,
    imoveis_config: false,
    imobiliarias: false,
    indexadores: false,
    inscricao_divida: false,
    integracao_contabil: false,
    integracao_lancamentos_config: false,
    integracoes_contabeis_config: false,
    junta_comercial_config: false,
    livros_divida_ativa: false,
    limites_arrecadacao: false,
    manutencao_divida: false,
    manutencao_pagamentos: false,
    materiais_servicos: false,
    motivos: false,
    naturezas_texto_juridico: false,
    notas_avulsas: false,
    notas_avulsas_config: false,
    obras: false,
    obras_config: false,
    parcelas: false,
    parcelamento_credito: false,
    planta_valores: false,
    receitas_diversas: false,
    receitas_diversas_config: false,
    requerimento_manutencao_lancamento: false,
    tabelas_calculo: false,
    taxas_expediente_config: false,
    termos_abertura_encerramento_livro: false,
    tipos_documentos: false,
    transferencia_imoveis: false,
    transferencia_imoveis_config: false,
    unidades_medida: false,
    viabilidade: false
  });

  useEffect(() => {
    if (acesso) {
      if (acesso.fk_grupo === grupo?.id ||
        acesso.fk_usuario === usuario?.id) {
        setCheckboxStates((prevState) => ({
          ...prevState,
          agencias: acesso.agencias!,
          aliquotas_irrf: acesso.aliquotas_irrf!,
          antecipacao_prorrogacao_vencimentos: acesso.antecipacao_prorrogacao_vencimentos!,
          arquivo_config: acesso.arquivo_config!,
          atos: acesso.atos!,
          bancos: acesso.bancos!,
          baixa_automatica: acesso.baixa_automatica!,
          baixa_manual: acesso.baixa_manual!,
          beneficiarios_fiscais: acesso.beneficiarios_fiscais!,
          calculo: acesso.calculo!,
          camaras_adicionais: acesso.camaras_adicionais!,
          cancelamento_reativacao_documentos: acesso.cancelamento_reativacao_documentos!,
          cadastro_geral: acesso.cadastro_geral!,
          cadastros_gerais: acesso.cadastros_gerais!,
          campos_adicionais: acesso.campos_adicionais!,
          cartorios: acesso.cartorios!,
          coberturas: acesso.coberturas!,
          competencias: acesso.competencias!,
          condicoes_parcelamento: acesso.condicoes_parcelamento!,
          configuracao_boletos: acesso.configuracao_boletos!,
          configuracao_cancelamento_boletos: acesso.configuracao_cancelamento_boletos!,
          configuracao_guia_boletos: acesso.configuracao_guia_boletos!,
          configuracao_inscricao_boletos: acesso.configuracao_inscricao_boletos!,
          configuracao_pagamentos_boletos: acesso.configuracao_pagamentos_boletos!,
          configuracoes_economicas: acesso.configuracoes_economicas!,
          configuracoes_imoveis: acesso.configuracoes_imoveis!,
          configuracoes_notas_avulsas: acesso.configuracoes_notas_avulsas!,
          configuracoes_receitas_diversas: acesso.configuracoes_receitas_diversas!,
          construtoras: acesso.construtoras!,
          contribuicoes_melhoria: acesso.contribuicoes_melhoria!,
          contribuintes: acesso.contribuintes!,
          controle_saldo_devedor: acesso.controle_saldo_devedor!,
          creditos_tributarios: acesso.creditos_tributarios!,
          declaracao_iss_homologado: acesso.declaracao_iss_homologado!,
          desmembramentos: acesso.desmembramentos!,
          documentos: acesso.documentos!,
          documentos_config: acesso.documentos_config!,
          economicos: acesso.economicos!,
          enderecos: acesso.enderecos!,
          englobados: acesso.englobados!,
          engenheiros: acesso.engenheiros!,
          estorno_inscricao: acesso.estorno_inscricao!,
          feriados: acesso.feriados!,
          fontes_divulgacao: acesso.fontes_divulgacao!,
          formulas: acesso.formulas!,
          geoprocessamento: acesso.geoprocessamento!,
          geoprocessamento_config: acesso.geoprocessamento_config!,
          gerenciador_economico: acesso.gerenciador_economico!,
          guias: acesso.guias!,
          horarios_funcionamento: acesso.horarios_funcionamento!,
          imoveis: acesso.imoveis!,
          imoveis_config: acesso.imoveis_config!,
          imobiliarias: acesso.imobiliarias!,
          indexadores: acesso.indexadores!,
          inscricao_divida: acesso.inscricao_divida!,
          integracao_contabil: acesso.integracao_contabil!,
          integracao_lancamentos_config: acesso.integracao_lancamentos_config!,
          integracoes_contabeis_config: acesso.integracoes_contabeis_config!,
          junta_comercial_config: acesso.junta_comercial_config!,
          livros_divida_ativa: acesso.livros_divida_ativa!,
          limites_arrecadacao: acesso.limites_arrecadacao!,
          manutencao_divida: acesso.manutencao_divida!,
          manutencao_pagamentos: acesso.manutencao_pagamentos!,
          materiais_servicos: acesso.materiais_servicos!,
          motivos: acesso.motivos!,
          naturezas_texto_juridico: acesso.naturezas_texto_juridico!,
          notas_avulsas: acesso.notas_avulsas!,
          notas_avulsas_config: acesso.notas_avulsas_config!,
          obras: acesso.obras!,
          obras_config: acesso.obras_config!,
          parcelas: acesso.parcelas!,
          parcelamento_credito: acesso.parcelamento_credito!,
          planta_valores: acesso.planta_valores!,
          receitas_diversas: acesso.receitas_diversas!,
          receitas_diversas_config: acesso.receitas_diversas_config!,
          requerimento_manutencao_lancamento: acesso.requerimento_manutencao_lancamento!,
          tabelas_calculo: acesso.tabelas_calculo!,
          taxas_expediente_config: acesso.taxas_expediente_config!,
          termos_abertura_encerramento_livro: acesso.termos_abertura_encerramento_livro!,
          tipos_documentos: acesso.tipos_documentos!,
          transferencia_imoveis: acesso.transferencia_imoveis!,
          transferencia_imoveis_config: acesso.transferencia_imoveis_config!,
          unidades_medida: acesso.unidades_medida!,
          viabilidade: acesso.viabilidade!
        }))
        setOriginalCheckboxStates({ ...checkboxStates });
      }
    }
  }, [acesso])

  useEffect(() => {
    if (originalCheckboxStates) {
      const hasChanged = Object.keys(checkboxStates)
        .some(key => checkboxStates[key as keyof CheckboxStates] !== originalCheckboxStates[key as keyof CheckboxStates]);
      setAcessoAlterado(hasChanged);
    }
  }, [checkboxStates, originalCheckboxStates]);


  const [isAtTop, setIsAtTop] = useState<boolean>(true);


  useEffect(() => {
    const scrollHandler = () => {
      setIsAtTop(window.scrollY === 0);
    };

    window.addEventListener('scroll', scrollHandler);

    return () => {
      window.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const handleCancelarAtualizarAcessos = () => {
    setAcessoAlterado(false);
    if (originalCheckboxStates) {
      setCheckboxStates(originalCheckboxStates);
    }
  };

  const handleCheckboxChange = (name: keyof CheckboxStates) => {
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: !prevState[name]
    }));
  };

  const handleOnEditarAcessos = () => {
    LerAcessos({ setAcessos })
    LerAcoes({setAcoes})
  }

  const handleAtualizarAcessos = async (acessos: Acessos, acessosAtualizados: CheckboxStates) => {
    try {
      await AtualizarAcessos({ acessos, acessosAtualizados });
      handleOnEditarAcessos();
      // Atualizar os estados originais para refletir as mudanças recentes
      setOriginalCheckboxStates(acessosAtualizados);
      setAcessoAlterado(false);
    } catch (e: any) {
      console.log(e.response?.request?.status);
    }
  };

  const handleAcoes = (mapAcesso: MapAcesso) => {
    acoes?.map(item => {
      if (item.tipo_acesso === mapAcesso.state && item.fk_acessos == acesso.id) {
        setMapAcesso(mapAcesso)
        setAcoesSelected(item)
        setOpenAcoes(true)
      }
    })
  }

  return (
    !location.state ? (
      <div >
        <div className="flex justify-center pt-[35vh]">
          <AiOutlineLoading3Quarters className="text-3xl text-blue-950 animate-spin" />
        </div>
        <div className="flex justify-center">

          <div className="flex justify-center pt-4 w-[40vw]">
            <span>Nada por aqui, por favor volte para página anterior e clique nos acessos do usuário ou grupo!</span>
          </div>
        </div>
      </div>
    ) : (
      <div className="grid justify-center mt-8">
        <button
          className="fixed bottom-4 right-4 w-10 h-10 bg-blue-950 text-white rounded-full flex items-center justify-center transition duration-300 hover:transition hover:duration-300 hover:opacity-70"
          onClick={isAtTop ? scrollToBottom : scrollToTop}
        >
          {isAtTop ? '▼' : '▲'}
        </button>
        <div className="w-[45rem] border-x border-blue-900" onClick={(e) => e.stopPropagation()}>
          <div className="flex justify-between px-4">
            <span className="content-center font-semibold">Acessos</span>
            <span>{grupo?.nome || usuario?.nome}</span>
          </div>
          <div>
            <div className="pt-4">
              {
                MapAcessos.map((item, index) => {
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
                          checked={checkboxStates[item.state as keyof CheckboxStates]}
                          onChange={() => handleCheckboxChange(item.state as keyof CheckboxStates)}
                        />
                        <button onClick={() => handleAcoes(item)}>
                          <HiArrowCircleRight className={`text-xl text-blue-950 transition-all active:transition-all active:opacity-90 actove:text-blue-900 ${checkboxStates[item.state as keyof CheckboxStates] ? 'opacity-100' : 'opacity-50 cursor-not-allowed'}`} />
                        </button>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        </div>
        <div className="my-4">
          <div className="flex gap-4 justify-center ">
            <button
              disabled={!acessoAlterado}
              onClick={handleCancelarAtualizarAcessos}
              className={`${!acessoAlterado && 'opacity-50 cursor-not-allowed'} bg-red-600 py-1 px-2 rounded-[0.3rem] text-[#fff] hover:opacity-80 transition-all hover:transition-all active:opacity-95`}>
              Cancelar alterações
            </button>
            <button
              disabled={!acessoAlterado}
              onClick={() => handleAtualizarAcessos(acesso, checkboxStates)}
              className={`${!acessoAlterado && 'opacity-50 cursor-not-allowed'} bg-blue-950 py-1 px-2 rounded-[0.3rem] text-[#fff] hover:opacity-80 transition-all hover:transition-all active:opacity-95`}>
              Atualizar alterações
            </button>
{/*             <button
              //disabled={!acessoAlterado}
              //onClick={() => handleAtualizarAcessos(originalCheckboxStates, checkboxStates)}
              onClick={() => console.log(acesso)}
              className={`${!acessoAlterado && 'opacity-50 cursor-not-allowed'} bg-blue-950 py-1 px-2 rounded-[0.3rem] text-[#fff] hover:opacity-80 transition-all hover:transition-all active:opacity-95`}>
              teste
            </button> */}
          </div>
        </div>
        <ModalAcoes openAcoes={openAcoes} setOpenAcoes={setOpenAcoes} mapAcesso={mapAcesso} acoes={acoesSelected!} acesso={acesso}/>
      </div >
    )
  )

}


