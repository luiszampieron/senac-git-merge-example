import { buscarDepoimentos, enviarContato, buscarProdutos } from "./api.js";
import {
  renderizarDepoimentos,
  renderizarProdutos,
  mostrarAlerta,
  atualizarContadorCarrinho,
} from "./ui.js";

// Atualiza o contador do carrinho no navbar
atualizarContadorCarrinho();

// Carrega os depoimentos na home
buscarDepoimentos().then(renderizarDepoimentos);

// Formulário de contato
const formContato = document.getElementById("form-contato");
if (formContato) {
  formContato.addEventListener("submit", async function (event) {
    event.preventDefault();

    const dados = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      mensagem: document.getElementById("mensagem").value,
    };

    try {
      const resposta = await enviarContato(dados);

      if (resposta.status === 201) {
        mostrarAlerta(
          "success",
          "<strong>Mensagem enviada!</strong> Obrigado pelo contato, retornaremos em breve.",
          formContato,
        );
        formContato.reset();
      } else {
        throw new Error("Status inesperado: " + resposta.status);
      }
    } catch (erro) {
      mostrarAlerta(
        "danger",
        "<strong>Erro ao enviar.</strong> Tente novamente mais tarde.",
        formContato,
      );
    }
  });
}

// Lógica central do carrinho (sem manipulação de botão)
function addToCart(nome, preco, qtdInputId) {
  const quantidade = parseInt(document.getElementById(qtdInputId)?.value) || 1;
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
}

function feedbackBotao(btn) {
  const textoOriginal = btn.innerHTML;
  btn.innerHTML = "✅ Adicionado!";
  btn.disabled = true;
  setTimeout(function () {
    btn.innerHTML = textoOriginal;
    btn.disabled = false;
  }, 1500);
}

// Carregamento dinâmico de produtos
const listaProdutos = document.getElementById("lista-produtos");
if (listaProdutos) {
  listaProdutos.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-3 text-muted">Carregando produtos...</p>
    </div>
  `;

  buscarProdutos()
    .then(renderizarProdutos)
    .catch(function () {
      listaProdutos.innerHTML =
        '<div class="col-12"><div class="alert alert-danger">Não foi possível carregar os produtos. Tente novamente.</div></div>';
    });

  listaProdutos.addEventListener("click", function (e) {
    const btn = e.target.closest(".btn-adicionar");
    if (!btn) return;
    addToCart(
      btn.dataset.nome,
      parseFloat(btn.dataset.preco),
      btn.dataset.qtdId,
    );
    feedbackBotao(btn);
  });
}

// Mantido para compatibilidade com páginas estáticas
function adicionarAoCarrinho(nome, preco, qtdInputId) {
  addToCart(nome, preco, qtdInputId);
  const btn = document.querySelector(
    `.btn-adicionar[data-qtd-id="${qtdInputId}"]`,
  );
  if (btn) feedbackBotao(btn);
}

window.adicionarAoCarrinho = adicionarAoCarrinho;

// Modal dinâmico de detalhes do produto
const modalProduto = document.getElementById("modalProduto");
if (modalProduto) {
  modalProduto.addEventListener("show.bs.modal", function (event) {
    const botao = event.relatedTarget;
    document.getElementById("modalProdutoTitulo").textContent =
      botao.dataset.nome;
    document.getElementById("modalProdutoDescricao").textContent =
      botao.dataset.descricao;
    document.getElementById("modalProdutoPreco").textContent =
      "R$ " + botao.dataset.preco;
  });
}
