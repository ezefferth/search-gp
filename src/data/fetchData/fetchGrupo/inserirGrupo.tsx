import axios from "axios";

type Props = {
  nome: string;
};

export async function InserirGrupo({ nome }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/inserirGrupo", { nome }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em inserir grupo!", response);
    return response;
  } catch (error) {
    console.log("Erro ao inserir grupo!", error);
    throw error;
  }
}