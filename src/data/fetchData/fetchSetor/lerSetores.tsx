import axios from "axios";
import { Setor } from "../../dataTypes";

type Props = {
  setSetores: (value: Array<Setor>) => void;
};

export async function LerSetores({ setSetores }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerSetores", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch setores!");
    setSetores(response.data);
  } catch (error) {
    console.log("Erro em fetch setores!", error);
  }
}