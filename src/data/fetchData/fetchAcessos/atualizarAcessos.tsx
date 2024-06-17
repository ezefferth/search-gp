import axios from "axios";
import { Acessos, CheckboxStates } from "../../dataTypes";

type Props = {
  acessos: Acessos
  acessosAtualizados: CheckboxStates
};

export async function AtualizarAcessos({ acessos, acessosAtualizados }: Props) {
  const id = acessos.id
  try {
    const response = await axios.post("http://localhost:4003/atualizarAcessos", { id, ...acessosAtualizados }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar acessos!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar acessos!", error);
    throw error;
  }
}