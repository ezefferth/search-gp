import axios from "axios";
import { Acoes } from "../../dataTypes";

type Props = {
  setAcoes: (value: Array<Acoes>) => void;
};

export async function LerAcessos({ setAcoes }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerAcessos", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch acessos!");
    setAcoes(response.data);
  } catch (error) {
    console.log("Erro em fetch acessos!", error);
  }
}