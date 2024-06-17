import axios from "axios";
import { Acoes, CheckboxAcoesStates } from "../../dataTypes";

type Props = {
  acoes: Acoes
  acoesAtualizados: CheckboxAcoesStates
};

export async function AtualizarAcoes({ acoes, acoesAtualizados }: Props) {
  const id = acoes.id
  try {
    const response = await axios.post("http://localhost:4003/atualizarAcoes", { id, ...acoesAtualizados }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar acoes!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar acoes!", error);
    throw error;
  }
}