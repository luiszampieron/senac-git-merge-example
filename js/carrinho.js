import "./theme.js";

function renderizarCarrinho() {
  // Agrupa itens com o mesmo nome antes de renderizar
  const raw = JSON.parse(localStorage.getItem("carrinho")) || [];
  const mapa = {};
  raw.forEach(function (item) {
    if (mapa[item.nome]) {
      mapa[item.nome].quantidade += item.quantidade;
    } else {
      mapa[item.nome] = {
        nome: item.nome,
        preco: item.preco,
        quantidade: item.quantidade,
      };
    }
  });
  const carrinho = Object.values(mapa);
  localStorage.setItem("carrinho", JSON.stringify(carrinho));

  const tbody = document.getElementById("carrinho-itens");
  const totalEl = document.getElementById("total-carrinho");
  const counter = document.getElementById("carrinho-count");

  tbody.innerHTML = "";

  if (carrinho.length === 0) {
    document.getElementById("carrinho-vazio").classList.remove("d-none");
    document.getElementById("carrinho-conteudo").classList.add("d-none");
    counter.textContent = "0";
    return;
  }

  document.getElementById("carrinho-vazio").classList.add("d-none");
  document.getElementById("carrinho-conteudo").classList.remove("d-none");

  let total = 0;
  let totalItens = 0;

  carrinho.forEach(function (item, index) {
    const subtotal = item.preco * item.quantidade;
    total += subtotal;
    totalItens += item.quantidade;

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${item.nome}</td>
      <td class="text-center">
        <div class="d-flex align-items-center justify-content-center gap-2">
          <button class="btn btn-outline-secondary btn-sm" onclick="alterarQuantidade(${index}, -1)">−</button>
          <span>${item.quantidade}</span>
          <button class="btn btn-outline-secondary btn-sm" onclick="alterarQuantidade(${index}, 1)">+</button>
        </div>
      </td>
      <td class="text-end">R$ ${item.preco.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
      <td class="text-end">R$ ${subtotal.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>
      <td class="text-center">
        <button class="btn btn-outline-danger btn-sm" onclick="removerItem(${index})">✕</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  totalEl.textContent = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
  });
  counter.textContent = totalItens;
}

function alterarQuantidade(index, delta) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  carrinho[index].quantidade += delta;
  if (carrinho[index].quantidade <= 0) {
    carrinho.splice(index, 1);
  }
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
  renderizarCarrinho();
}

let _indexParaRemover = null;

function removerItem(index) {
  const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
  _indexParaRemover = index;
  document.getElementById("modalRemoverNome").textContent =
    carrinho[index].nome;
  const modal = new bootstrap.Modal(document.getElementById("modalRemover"));
  modal.show();
}

document
  .getElementById("modalRemoverConfirmar")
  .addEventListener("click", function () {
    if (_indexParaRemover === null) return;
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    carrinho.splice(_indexParaRemover, 1);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    _indexParaRemover = null;
    bootstrap.Modal.getInstance(document.getElementById("modalRemover")).hide();
    renderizarCarrinho();
  });

function limparCarrinho() {
  if (confirm("Tem certeza que deseja limpar o carrinho?")) {
    localStorage.removeItem("carrinho");
    renderizarCarrinho();
  }
}

function finalizarPedido() {
  localStorage.removeItem("carrinho");
  const modal = new bootstrap.Modal(document.getElementById("modalFinalizado"));
  modal.show();
}

// Expõe funções chamadas via onclick inline
window.alterarQuantidade = alterarQuantidade;
window.removerItem = removerItem;
window.limparCarrinho = limparCarrinho;
window.finalizarPedido = finalizarPedido;

renderizarCarrinho();
