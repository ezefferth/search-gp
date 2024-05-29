import axios from "axios";

type Props = {
  nome: String;

};

export async function InserirSetor({ nome }: Props) {
  await axios("http://localhost:4003/inserirSetor", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    data: { nome: nome },
  })
    .then((response: any) => {
      console.log("Sucesso em inserir setor!", response)
      return response
    })
    .catch((error: any) => {
      console.log("Erro ao inserir setor!", error)
      throw error
    });
}