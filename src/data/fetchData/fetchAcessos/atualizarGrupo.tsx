import axios from "axios";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarGrupo({ id, nome }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/atualizarGrupo", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar grupo!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar grupo!", error);
    throw error;
  }
}