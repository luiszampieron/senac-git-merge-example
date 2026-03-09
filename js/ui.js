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
