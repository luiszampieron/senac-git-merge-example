function escAttr(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function renderizarProdutos(produtos) {
  const lista = document.getElementById("lista-produtos");
  if (!lista) return;

  lista.innerHTML = "";

  produtos.forEach(function (produto) {
    const qtdId = `qtd-produto${produto.id}`;
    const preco = produto.price.toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
    });
    const titulo = escAttr(produto.title);
    const descricao = escAttr(produto.description);
    const estrelas = Math.round(produto.rating.rate);

    lista.innerHTML += `
      <div class="col-md-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="d-flex align-items-center justify-content-center p-3 bg-white" style="height: 220px;">
            <img src="${produto.image}" class="img-fluid" style="max-height: 200px; object-fit: contain;" alt="${titulo}">
          </div>
          <div class="card-body d-flex flex-column">
            <span class="badge bg-secondary mb-2 text-capitalize" style="width: fit-content;">${produto.category}</span>
            <h5 class="card-title fs-6">${produto.title}</h5>
            <p class="card-text text-muted small flex-grow-1">${produto.description.substring(0, 90)}...</p>
            <div class="d-flex align-items-center gap-1 mb-2 small">
              <span class="text-warning">${"★".repeat(estrelas)}${"☆".repeat(5 - estrelas)}</span>
              <span class="text-muted">(${produto.rating.count})</span>
            </div>
            <div class="d-flex align-items-center justify-content-between gap-2 mb-3">
              <p class="fw-bold mt-auto mb-2">R$ ${preco}</p>
              <div class="d-flex align-items-center gap-2">
                <label for="${qtdId}" class="form-label mb-0 text-nowrap">Qtd:</label>
                <input type="number" class="form-control form-control-sm" id="${qtdId}" value="1" min="1" style="width: 70px;">
              </div>
            </div>
            <div class="d-flex gap-2 mt-auto">
              <button class="btn btn-outline-secondary flex-grow-1"
                data-bs-toggle="modal" data-bs-target="#modalProduto"
                data-nome="${titulo}"
                data-descricao="${descricao}"
                data-preco="${preco}">
                🔍 Ver Detalhes
              </button>
              <button class="btn btn-primary flex-grow-1 btn-adicionar"
                data-nome="${titulo}"
                data-preco="${produto.price}"
                data-qtd-id="${qtdId}">
                🛒 Adicionar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
}

export function renderizarDepoimentos(depoimentos) {
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

export function mostrarAlerta(tipo, mensagem, referencia) {
  const alerta = document.createElement("div");
  alerta.className = `alert alert-${tipo} mt-4 alert-dismissible fade show`;
  alerta.setAttribute("role", "alert");
  alerta.innerHTML = `
    ${mensagem}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
  `;
  referencia.insertAdjacentElement("afterend", alerta);
}

export function atualizarContadorCarrinho() {
  const counter = document.getElementById("carrinho-count");
  if (!counter) return;
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  const total = carrinho.reduce(function (acc, item) {
    return acc + item.quantidade;
  }, 0);
  counter.textContent = total;
}
