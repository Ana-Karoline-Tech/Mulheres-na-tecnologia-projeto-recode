document.addEventListener('DOMContentLoaded', function() {
  const texto = "Conectamos, capacitamos e inspiramos mulheres\na construir carreiras de sucesso no mundo tech";
  const el = document.getElementById('typing-text');
  let i = 0;

  function digitar() {
    if (i <= texto.length) {
      // Substitui \n por <br> para quebrar a linha
      el.innerHTML = texto.slice(0, i).replace(/\n/g, "<br>");
      i++;
      setTimeout(digitar, 50); // velocidade da digitação
    }
  }

  digitar();
});