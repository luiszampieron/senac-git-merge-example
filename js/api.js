export async function buscarProdutos() {
  const resposta = await fetch("https://fakestoreapi.com/products?limit=6");
  if (!resposta.ok) throw new Error("Erro ao buscar produtos");
  return resposta.json();
}

export async function buscarDepoimentos() {
  const resposta = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=3"
  );
  return resposta.json();
}

export async function enviarContato(dados) {
  const resposta = await fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dados),
  });
  return resposta;
}
