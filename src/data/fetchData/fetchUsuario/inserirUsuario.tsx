import axios from "axios";

type Props = {
  nome: string;
  nome_login: string;
  fk_setor: string
  vinculo: string
  cargo: string
};

export async function InserirUsuario({ nome, nome_login, fk_setor, vinculo, cargo }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/inserirUsuario", { nome, nome_login, fk_setor, vinculo, cargo }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em inserir usuario!", response);
    return response;
  } catch (error) {
    console.log("Erro ao inserir usuario!", error);
    throw error;
  }
}