const THEME_STORAGE_KEY = "labubu-theme";
const THEMES = ["theme-default", "theme-ocean", "theme-sunset"] as const;
type Theme = (typeof THEMES)[number];

function validarTema(theme: string | null): Theme {
  return (THEMES as readonly string[]).includes(theme ?? "")
    ? (theme as Theme)
    : "theme-default";
}

function obterTemaSalvo(): Theme {
  try {
    return validarTema(localStorage.getItem(THEME_STORAGE_KEY));
  } catch (_erro) {
    return "theme-default";
  }
}

function atualizarBotoesTema(theme: Theme): void {
  const botoes = document.querySelectorAll<HTMLElement>("[data-theme-value]");
  botoes.forEach(function (botao) {
    const ativo = botao.dataset.themeValue === theme;
    botao.classList.toggle("active", ativo);
    botao.setAttribute("aria-pressed", String(ativo));
  });
}

function aplicarTema(theme: string): void {
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

function configurarTrocaDeTema(): void {
  document.addEventListener("click", function (event) {
    const botao = (event.target as Element).closest<HTMLElement>(
      "[data-theme-value]",
    );
    if (!botao) return;
    aplicarTema(botao.dataset.themeValue ?? "theme-default");
  });
}

if (document.body) {
  aplicarTema(obterTemaSalvo());
  configurarTrocaDeTema();
}
