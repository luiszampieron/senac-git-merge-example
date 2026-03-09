import { buscarDepoimentos, enviarContato } from "./api.js";
import {
  renderizarDepoimentos,
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
          formContato
        );
        formContato.reset();
      } else {
        throw new Error("Status inesperado: " + resposta.status);
      }
    } catch (erro) {
      mostrarAlerta(
        "danger",
        "<strong>Erro ao enviar.</strong> Tente novamente mais tarde.",
        formContato
      );
    }
  });
}

// Exposto globalmente para os onclick inline em produtos.html
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

window.adicionarAoCarrinho = adicionarAoCarrinho;

// Modal dinâmico de detalhes do produto
const modalProduto = document.getElementById("modalProduto");
if (modalProduto) {
  modalProduto.addEventListener("show.bs.modal", function (event) {
    const botao = event.relatedTarget;
    document.getElementById("modalProdutoTitulo").textContent = botao.dataset.nome;
    document.getElementById("modalProdutoDescricao").textContent = botao.dataset.descricao;
    document.getElementById("modalProdutoPreco").textContent = "R$ " + botao.dataset.preco;
  });
}
