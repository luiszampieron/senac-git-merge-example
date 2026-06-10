interface BootstrapModal {
  show(): void;
  hide(): void;
}

declare const bootstrap: {
  Modal: {
    new (element: Element): BootstrapModal;
    getInstance(element: Element | null): BootstrapModal | null;
  };
};

interface Window {
  alterarQuantidade(index: number, delta: number): void;
  removerItem(index: number): void;
  limparCarrinho(): void;
  finalizarPedido(): void;
  adicionarAoCarrinho(nome: string, preco: number, qtdInputId: string): void;
}
