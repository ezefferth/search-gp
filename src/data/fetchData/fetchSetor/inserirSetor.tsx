import axios from "axios";

type Props = {
  nome: string;
};

export async function InserirSetor({ nome }: Props) {
  try {
    const response = await axios.post("http://localhost:4003/inserirSetor", {
      headers: { "Content-Type": "application/json" },
      data: { nome: nome },
    });
    console.log("Sucesso em inserir setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao inserir setor!", error);
    throw error;
  }
}