import axios from "axios";

type Props = {
  id: string;
};

export async function DeletarSetor({ id }: Props) {
  try {
    const response = await axios.delete("http://localhost:4003/deletarSetor", {
      headers: { "Content-Type": "application/json" },
      data: { id: id },
    });
    console.log("Sucesso em deletar setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao deletar setor!", error);
    throw error;
  }
}