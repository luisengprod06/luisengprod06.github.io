// Ano do rodapé e dica dos gráficos (mouse, toque e teclado).
document.getElementById("ano").textContent = new Date().getFullYear();

(function () {
  var dica = document.createElement("div");
  dica.className = "dica";
  dica.setAttribute("role", "status");
  document.body.appendChild(dica);

  function mostrar(alvo, x, y) {
    dica.textContent = alvo.getAttribute("data-tip");
    dica.classList.add("visivel");
    var w = dica.offsetWidth;
    var esquerda = Math.min(Math.max(8, x - w / 2), window.innerWidth - w - 8);
    dica.style.left = esquerda + "px";
    dica.style.top = Math.max(8, y - dica.offsetHeight - 12) + "px";
  }
  function esconder() { dica.classList.remove("visivel"); }

  document.querySelectorAll(".grafico .marca[data-tip]").forEach(function (m) {
    m.addEventListener("pointermove", function (e) { mostrar(m, e.clientX, e.clientY); });
    m.addEventListener("pointerdown", function (e) { mostrar(m, e.clientX, e.clientY); });
    m.addEventListener("pointerleave", esconder);
    m.addEventListener("focus", function () {
      var r = m.getBoundingClientRect();
      mostrar(m, r.left + r.width / 2, r.top);
    });
    m.addEventListener("blur", esconder);
  });
  window.addEventListener("scroll", esconder, { passive: true });
})();
