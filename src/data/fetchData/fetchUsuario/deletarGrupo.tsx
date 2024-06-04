import axios from "axios";

type Props = {
  id: string;
};

export async function DeletarUsuario({ id }: Props) {
  try {
    const response = await axios.delete("http://localhost:4003/deletarUsuario", {
      headers: { "Content-Type": "application/json" },
      data: { id: id },
    });
    console.log("Sucesso em deletar usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao deletar usuario!", error);
    throw error;
  }
}