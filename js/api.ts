export interface Produto {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
}

export interface Depoimento {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface ContatoDados {
  nome: string;
  email: string;
  mensagem: string;
}

export async function buscarProdutos(): Promise<Produto[]> {
  const resposta = await fetch("https://fakestoreapi.com/products?limit=6");
  if (!resposta.ok) throw new Error("Erro ao buscar produtos");
  return resposta.json();
}

export async function buscarDepoimentos(): Promise<Depoimento[]> {
  const resposta = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=3",
  );
  return resposta.json();
}

export async function enviarContato(dados: ContatoDados): Promise<Response> {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return resposta;
}
