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
