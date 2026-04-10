const THEME_STORAGE_KEY = "labubu-theme";
const THEMES = ["theme-default", "theme-ocean", "theme-sunset"];

function validarTema(theme) {
  return THEMES.includes(theme) ? theme : "theme-default";
}

function obterTemaSalvo() {
  try {
    return validarTema(localStorage.getItem(THEME_STORAGE_KEY));
  } catch (_erro) {
    return "theme-default";
  }
}

function atualizarBotoesTema(theme) {
  const botoes = document.querySelectorAll("[data-theme-value]");
  botoes.forEach(function (botao) {
    const ativo = botao.dataset.themeValue === theme;
    botao.classList.toggle("active", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
}

function aplicarTema(theme) {
  const temaSeguro = validarTema(theme);
  THEMES.forEach(function (nomeTema) {
    document.body.classList.remove(nomeTema);
  });

  document.body.classList.add(temaSeguro);
  atualizarBotoesTema(temaSeguro);

  try {
    localStorage.setItem(THEME_STORAGE_KEY, temaSeguro);
  } catch (_erro) {
    // Sem persistencia quando localStorage nao estiver disponivel.
  }
}

function configurarTrocaDeTema() {
  document.addEventListener("click", function (event) {
    const botao = event.target.closest("[data-theme-value]");
    if (!botao) return;
    aplicarTema(botao.dataset.themeValue);
  });
}

if (document.body) {
  aplicarTema(obterTemaSalvo());
  configurarTrocaDeTema();
}
