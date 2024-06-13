import axios from "axios";
import { Acoes } from "../../dataTypes";

type Props = {
  setAcoes: (value: Array<Acoes>) => void;
};

export async function LerAcoes({ setAcoes }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerAcoes", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch acoes!");
    setAcoes(response.data);
  } catch (error) {
    console.log("Erro em fetch acoes!", error);
  }
}