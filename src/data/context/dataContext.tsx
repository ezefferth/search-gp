

import { createContext, useState, useEffect } from "react";
import { Acessos, Acoes, Grupo, Setor, Usuario } from "../dataTypes";
import { LerSetores } from "../fetchData/fetchSetor/lerSetores";
import { LerGrupos } from "../fetchData/fetchGrupo/lerGrupos";
import { LerUsuarios } from "../fetchData/fetchUsuario/lerUsuarios";
import { LerAcessos } from "../fetchData/fetchAcessos/lerAcoes";

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
    //const auxSetor: Array<Setor> = (setores ?? []).sort((a, b) => a.nome.localeCompare(b.nome))
    //setSetores(auxSetor)
  }, []);
  /* ---------- END SETORES ---------- */
  /* ---------- START GRUPOS ---------- */
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        LerGrupos({ setGrupos });

      } catch (error) {
        console.log("Erro no useEffect Grupos", error);
        return;
      }
    };
    fetchGrupos();
    //const auxSetor: Array<Setor> = (setores ?? []).sort((a, b) => a.nome.localeCompare(b.nome))
    //setSetores(auxSetor)
  }, []);
  /* ---------- END GRUPOS ---------- */
  /* ---------- START USUARIOS ---------- */
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        LerUsuarios({ setUsuarios });

      } catch (error) {
        console.log("Erro no useEffect Usuarios", error);
        return;
      }
    };
    fetchUsuarios();
    //const auxSetor: Array<Setor> = (setores ?? []).sort((a, b) => a.nome.localeCompare(b.nome))
    //setSetores(auxSetor)
  }, []);
  /* ---------- END USUARIOS ---------- */
  /* ---------- START USUARIOS ---------- */
  useEffect(() => {
    const fetchAcessos = async () => {
      try {
        LerAcessos({ setAcessos });

      } catch (error) {
        console.log("Erro no useEffect Acessos", error);
        return;
      }
    };
    fetchAcessos();
    //const auxSetor: Array<Setor> = (setores ?? []).sort((a, b) => a.nome.localeCompare(b.nome))
    //setSetores(auxSetor)
  }, []);
  /* ---------- END USUARIOS ---------- */

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