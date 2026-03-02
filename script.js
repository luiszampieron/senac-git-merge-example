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

const checkboxes = document.querySelectorAll(".item-produto");
const quantidades = document.querySelectorAll(".qtd-produto");

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", calcularTotal);
});

quantidades.forEach(function (input) {
  input.addEventListener("change", calcularTotal);
});
