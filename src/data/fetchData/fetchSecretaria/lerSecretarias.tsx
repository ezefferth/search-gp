import axios from "axios";
import { Secretaria } from "../../dataTypes";

type Props = {
  setSecretarias: (value: Array<Secretaria>) => void;
};

export async function LerSecretarias({ setSecretarias }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerSecretaria", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch secretarias!");
    setSecretarias(response.data);
  } catch (error) {
    console.log("Erro em fetch secretarias!", error);
  }
}