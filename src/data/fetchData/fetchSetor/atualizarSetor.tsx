import axios from "axios";

type Props = {
  id: string;
  nome: string;
  fk_secretaria: string
};

export async function AtualizarSetor({ id, nome, fk_secretaria }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/atualizarSetor", { id, nome, fk_secretaria }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar setor!", error);
    throw error;
  }
}