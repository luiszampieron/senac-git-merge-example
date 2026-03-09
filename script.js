function adicionarAoCarrinho(nome, preco, qtdInputId) {
  const quantidade = parseInt(document.getElementById(qtdInputId).value) || 1;

  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const existente = carrinho.find(function (item) {
    return item.nome === nome;
  });

  if (existente) {
    existente.quantidade += quantidade;
  } else {
    carrinho.push({ nome: nome, preco: preco, quantidade: quantidade });
  }

  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  atualizarContadorCarrinho();

  // Feedback visual no botão
  const btn = document.querySelector(`button[onclick*="${qtdInputId}"]`);
  if (btn) {
    const textoOriginal = btn.innerHTML;
    btn.innerHTML = "✅ Adicionado!";
    btn.disabled = true;
    setTimeout(function () {
      btn.innerHTML = textoOriginal;
      btn.disabled = false;
    }, 1500);
  }
}

function atualizarContadorCarrinho() {
  const counter = document.getElementById("carrinho-count");
  if (!counter) return;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const total = carrinho.reduce(function (acc, item) {
    return acc + item.quantidade;
  }, 0);
  counter.textContent = total;
}

atualizarContadorCarrinho();

async function carregarDepoimentos() {
  const resposta = await fetch(
    "https://jsonplaceholder.typicode.com/comments?_limit=3",
  );
  const depoimentos = await resposta.json();

  const lista = document.getElementById("lista-depoimentos");
  if (!lista) return;

  depoimentos.forEach(function (depoimento) {
    lista.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${depoimento.name}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${depoimento.email}</h6>
            <p class="card-text">${depoimento.body}</p>
          </div>
        </div>
      </div>
    `;
  });
}

carregarDepoimentos();
