

import { createContext, useState, useEffect } from "react";
import { Acessos, Acoes, Grupo, Setor, Usuario } from "../dataTypes";
import { LerSetores } from "../fetchData/fetchSetor/lerSetores";

type DataContextType = {
  usuarios?: Array<Usuario>;
  setUsuarios: (value: Array<Usuario>) => void;
  grupos?: Array<Grupo>;
  setGrupos: (value: Grupo[]) => void;
  acessos?: Array<Acessos>;
  setAcessos: (value: Array<Acessos>) => void;
  acoes?: Array<Acoes>;
  setAcoes: (value: Array<Acoes>) => void;
  setores?: Setor[];
  setSetores: (value: Setor[]) => void;
};

export const DataContext = createContext({} as DataContextType);


export default function DataProvider({ children }: any) {

  const [setores, setSetores] = useState<Setor[] | undefined>([])
  const [usuarios, setUsuarios] = useState<Usuario[] | undefined>([])
  const [grupos, setGrupos] = useState<Grupo[] | undefined>([])
  const [acoes, setAcoes] = useState<Acoes[] | undefined>([])
  const [acessos, setAcessos] = useState<Acessos[] | undefined>([])

  /* ---------- START SETORES ---------- */
  useEffect(() => {
    const fetchSetores = async () => {
      try {
        LerSetores({ setSetores });
      } catch (error) {
        console.log("Erro no useEffect Setores", error);
        return;
      }
    };
    fetchSetores();
  }, []);
  /* ---------- END SETORES ---------- */

  return (
    <DataContext.Provider
      value={{
        setores,
        setSetores,
        usuarios,
        setUsuarios,
        grupos,
        setGrupos,
        acoes,
        setAcoes,
        acessos,
        setAcessos,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}