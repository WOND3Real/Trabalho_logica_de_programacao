function mudarPagina() {
    var select = document.getElementById("meuSelect");
    var opcaoSelecionada = select.value;

    if (opcaoSelecionada) {
      window.location.href = opcaoSelecionada;
    }
}

