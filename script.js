function calcularTotal() {
  const checkboxes = document.querySelectorAll(".item-produto");
  const quantidades = document.querySelectorAll(".qtd-produto");
  let total = 0;

  checkboxes.forEach(function (checkbox, index) {
    if (checkbox.checked) {
      const preco = parseFloat(checkbox.value);
      const quantidade = parseInt(quantidades[index].value) || 1;
      total += preco * quantidade;
    }
  });

  const totalFormatado = total.toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  document.getElementById("valor-total").textContent = totalFormatado;
}

function efetivarCompra() {
  const checkboxes = document.querySelectorAll(".item-produto");
  const quantidades = document.querySelectorAll(".qtd-produto");
  const itensSelecionados = [];

  checkboxes.forEach(function (checkbox, index) {
    if (checkbox.checked) {
      itensSelecionados.push({
        nome: checkbox.dataset.nome,
        preco: parseFloat(checkbox.value),
        quantidade: parseInt(quantidades[index].value) || 1,
      });
    }
  });

  if (itensSelecionados.length === 0) {
    alert("Selecione ao menos um produto antes de efetivar a compra!");
    return;
  }

  // Recupera o carrinho atual e adiciona os novos itens
  const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho")) || [];

  itensSelecionados.forEach(function (novoItem) {
    const existente = carrinhoAtual.find(function (item) {
      return item.nome === novoItem.nome;
    });
    if (existente) {
      existente.quantidade += novoItem.quantidade;
    } else {
      carrinhoAtual.push(novoItem);
    }
  });

  localStorage.setItem("carrinho", JSON.stringify(carrinhoAtual));
  window.location.href = "carrinho.html";
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

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", calcularTotal);
});

quantidades.forEach(function (input) {
  input.addEventListener("change", calcularTotal);
});

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
