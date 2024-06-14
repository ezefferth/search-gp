import axios from "axios";

type Props = {
  nome: string;
  fk_secretaria: string
};

export async function InserirSetor({ nome, fk_secretaria }: Props) {
  try { 
    const response = await axios.post("http://localhost:4003/inserirSetor", { nome, fk_secretaria }, {
      headers: { "Content-Type": "application/json" }
    });
    console.log("Sucesso em inserir setor!", response);
    return response;
  } catch (error) {
    console.log("Erro ao inserir setor!", error);
    throw error;
  }
}