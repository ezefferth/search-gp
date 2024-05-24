import axios from "axios";
import { Setor } from "../../dataTypes";


type Props = {
  setSetores: (value: Array<Setor>) => void;
};

export async function LerSetores({ setSetores }: Props) {
  await axios("http://localhost:4003/lerSetores", {
    method: "GET",
    headers: { "Content-Type": "application/json" },

  })
    .then((response: any) => {
      console.log("Sucesso em fetch setores!");
      setSetores(response.data);
    })
    .catch((error: any) => {
      console.log("Erro em fetch setores!", error);
    });
}