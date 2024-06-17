import axios from "axios";
import { Grupo } from "../../dataTypes";

type Props = {
  setGrupos: (value: Array<Grupo>) => void;
};

export async function LerGrupos({ setGrupos }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerGrupos", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch grupos!");
    setGrupos(response.data);
  } catch (error) {
    console.log("Erro em fetch grupos!", error);
  }
}