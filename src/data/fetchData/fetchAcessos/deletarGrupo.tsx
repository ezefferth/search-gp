import axios from "axios";

type Props = {
  id: string;
};

export async function DeletarGrupo({ id }: Props) {
  try {
    const response = await axios.delete("http://localhost:4003/deletarGrupo", {
      headers: { "Content-Type": "application/json" },
      data: { id: id },
    });
    console.log("Sucesso em deletar grupo!", response);
    return response;
  } catch (error) {
    console.log("Erro ao deletar grupo!", error);
    throw error;
  }
}