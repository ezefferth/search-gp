import axios from "axios";

type Props = {
  id: string;
  nome: string;
  nome_login: string;
  vinculo: string;
  cargo: string;
  fk_setor: string
};

export async function AtualizarUsuario({ id, nome, nome_login, vinculo, cargo, fk_setor }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/atualizarUsuario", { id, nome, nome_login, vinculo, cargo, fk_setor }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em atualizar usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao atualizar usuario!", error);
    throw error;
  }
}