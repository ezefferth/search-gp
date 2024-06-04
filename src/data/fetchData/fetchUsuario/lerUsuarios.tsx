import axios from "axios";
import { Usuario } from "../../dataTypes";

type Props = {
  setUsuarios: (value: Array<Usuario>) => void;
};

export async function LerUsuarios({ setUsuarios }: Props) {
  try {
    const response = await axios.get("http://localhost:4003/lerUsuarios", {
      headers: { "Content-Type": "application/json" },
    });
    console.log("Sucesso em fetch usuarios!");
    setUsuarios(response.data);
  } catch (error) {
    console.log("Erro em fetch usuarios!", error);
  }
}