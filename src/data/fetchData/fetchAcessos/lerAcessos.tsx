import axios from "axios";
import { Acessos } from "../../dataTypes";

type Props = {
  setAcessos: (value: Array<Acessos>) => void;
};

export async function LerAcessos({ setAcessos }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerAcessos", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch secretaria!");
    setAcessos(response.data);
  } catch (error) {
    console.log("Erro em fetch secretaria!", error);
  }
}