
export interface MapAcesso {
  nome: string
  state: string
}
export interface MapAcao {
  nome: string
  state: string
}

export type Secretaria = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nome: string;
}

export type Usuario = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nome: string;
  nome_login: string;
  fk_setor: string;
  vinculo: string,
  cargo: string
}

export type Setor = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nome: string;
  fk_secretaria: string;
}

export type Grupo = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  nome: string;
}

export type Acoes = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fk_acessos: string;
  tipo_acesso: string;
  criar?: boolean;
  editar?: boolean;
  remover?: boolean;
  emitir?: boolean;
  emitirSegVia?: boolean;
  cancelar?: boolean;
  reativar?: boolean;
  manutencao?: boolean;
  estornar?: boolean;
  homologar?: boolean;
  consultar?: boolean;
  transferir?: boolean;
  executar?: boolean;
}

export type Acessos = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  fk_usuario?: string | null;
  fk_grupo?: string | null;
  agencias?: boolean;
  aliquotas_irrf?: boolean;
  antecipacao_prorrogacao_vencimentos?: boolean;
  arquivo_config?: boolean;
  atos?: boolean;
  bancos?: boolean;
  baixa_automatica?: boolean;
  baixa_manual?: boolean;
  beneficiarios_fiscais?: boolean;
  calculo?: boolean;
  camaras_adicionais?: boolean;
  cancelamento_reativacao_documentos?: boolean;
  cadastro_geral?: boolean;
  cadastros_gerais?: boolean;
  campos_adicionais?: boolean;
  cartorios?: boolean;
  coberturas?: boolean;
  competencias?: boolean;
  condicoes_parcelamento?: boolean;
  configuracao_boletos?: boolean;
  configuracao_cancelamento_boletos?: boolean;
  configuracao_guia_boletos?: boolean;
  configuracao_inscricao_boletos?: boolean;
  configuracao_pagamentos_boletos?: boolean;
  configuracoes_economicas?: boolean;
  configuracoes_imoveis?: boolean;
  configuracoes_notas_avulsas?: boolean;
  configuracoes_receitas_diversas?: boolean;
  construtoras?: boolean;
  contribuicoes_melhoria?: boolean;
  contribuintes?: boolean;
  controle_saldo_devedor?: boolean;
  creditos_tributarios?: boolean;
  declaracao_iss_homologado?: boolean;
  desmembramentos?: boolean;
  documentos?: boolean;
  documentos_config?: boolean;
  economicos?: boolean;
  enderecos?: boolean;
  englobados?: boolean;
  engenheiros?: boolean;
  estorno_inscricao?: boolean;
  feriados?: boolean;
  fontes_divulgacao?: boolean;
  formulas?: boolean;
  geoprocessamento?: boolean;
  geoprocessamento_config?: boolean;
  gerenciador_economico?: boolean;
  guias?: boolean;
  horarios_funcionamento?: boolean;
  imoveis?: boolean;
  imoveis_config?: boolean;
  imobiliarias?: boolean;
  indexadores?: boolean;
  inscricao_divida?: boolean;
  integracao_contabil?: boolean;
  integracao_lancamentos_config?: boolean;
  integracoes_contabeis_config?: boolean;
  junta_comercial_config?: boolean;
  livros_divida_ativa?: boolean;
  limites_arrecadacao?: boolean;
  manutencao_divida?: boolean;
  manutencao_pagamentos?: boolean;
  materiais_servicos?: boolean;
  motivos?: boolean;
  naturezas_texto_juridico?: boolean;
  notas_avulsas?: boolean;
  notas_avulsas_config?: boolean;
  obras?: boolean;
  obras_config?: boolean;
  parcelas?: boolean;
  parcelamento_credito?: boolean;
  planta_valores?: boolean;
  receitas_diversas?: boolean;
  receitas_diversas_config?: boolean;
  requerimento_manutencao_lancamento?: boolean;
  tabelas_calculo?: boolean;
  taxas_expediente_config?: boolean;
  termos_abertura_encerramento_livro?: boolean;
  tipos_documentos?: boolean;
  transferencia_imoveis?: boolean;
  transferencia_imoveis_config?: boolean;
  unidades_medida?: boolean;
  viabilidade?: boolean;
}

export interface CheckboxStates {
  agencias: boolean;
  aliquotas_irrf: boolean;
  antecipacao_prorrogacao_vencimentos: boolean;
  arquivo_config: boolean;
  atos: boolean;
  bancos: boolean;
  baixa_automatica: boolean;
  baixa_manual: boolean;
  beneficiarios_fiscais: boolean;
  calculo: boolean;
  camaras_adicionais: boolean;
  cancelamento_reativacao_documentos: boolean;
  cadastro_geral: boolean;
  cadastros_gerais: boolean;
  campos_adicionais: boolean;
  cartorios: boolean;
  coberturas: boolean;
  competencias: boolean;
  condicoes_parcelamento: boolean;
  configuracao_boletos: boolean;
  configuracao_cancelamento_boletos: boolean;
  configuracao_guia_boletos: boolean;
  configuracao_inscricao_boletos: boolean;
  configuracao_pagamentos_boletos: boolean;
  configuracoes_economicas: boolean;
  configuracoes_imoveis: boolean;
  configuracoes_notas_avulsas: boolean;
  configuracoes_receitas_diversas: boolean;
  construtoras: boolean;
  contribuicoes_melhoria: boolean;
  contribuintes: boolean;
  controle_saldo_devedor: boolean;
  creditos_tributarios: boolean;
  declaracao_iss_homologado: boolean;
  desmembramentos: boolean;
  documentos: boolean;
  documentos_config: boolean;
  economicos: boolean;
  enderecos: boolean;
  englobados: boolean;
  engenheiros: boolean;
  estorno_inscricao: boolean;
  feriados: boolean;
  fontes_divulgacao: boolean;
  formulas: boolean;
  geoprocessamento: boolean;
  geoprocessamento_config: boolean;
  gerenciador_economico: boolean;
  guias: boolean;
  horarios_funcionamento: boolean;
  imoveis: boolean;
  imoveis_config: boolean;
  imobiliarias: boolean;
  indexadores: boolean;
  inscricao_divida: boolean;
  integracao_contabil: boolean;
  integracao_lancamentos_config: boolean;
  integracoes_contabeis_config: boolean;
  junta_comercial_config: boolean;
  livros_divida_ativa: boolean;
  limites_arrecadacao: boolean;
  manutencao_divida: boolean;
  manutencao_pagamentos: boolean;
  materiais_servicos: boolean;
  motivos: boolean;
  naturezas_texto_juridico: boolean;
  notas_avulsas: boolean;
  notas_avulsas_config: boolean;
  obras: boolean;
  obras_config: boolean;
  parcelas: boolean;
  parcelamento_credito: boolean;
  planta_valores: boolean;
  receitas_diversas: boolean;
  receitas_diversas_config: boolean;
  requerimento_manutencao_lancamento: boolean;
  tabelas_calculo: boolean;
  taxas_expediente_config: boolean;
  termos_abertura_encerramento_livro: boolean;
  tipos_documentos: boolean;
  transferencia_imoveis: boolean;
  transferencia_imoveis_config: boolean;
  unidades_medida: boolean;
  viabilidade: boolean;
}

export interface CheckboxAcoesStates {
  criar: boolean;
  editar: boolean;
  remover: boolean;
  emitir: boolean;
  emitirSegVia: boolean;
  cancelar: boolean;
  reativar: boolean;
  manutencao: boolean;
  estornar: boolean;
  homologar: boolean;
  consultar: boolean;
  transferir: boolean;
  executar: boolean;
}