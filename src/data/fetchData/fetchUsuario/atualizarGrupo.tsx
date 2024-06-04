import axios from "axios";

type Props = {
  id: string;
  nome: string;
};

export async function AtualizarUsuario({ id, nome }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/atualizarUsuario", { id, nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar usuario!", error);
    throw error;
  }
}