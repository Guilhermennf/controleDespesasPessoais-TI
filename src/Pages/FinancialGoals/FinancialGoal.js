document.addEventListener("DOMContentLoaded", function () {
    var inputValor = document.getElementById("valor");

    inputValor.addEventListener("input", function (e) {
        // Remove caracteres não numéricos
        var valorFormatado = this.value.replace(/\D/g, "");

        // Formata o valor com duas casas decimais e adiciona o R$
        valorFormatado = (parseFloat(valorFormatado) / 100).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL",
            }
        );

        // Atualiza o valor no input
        this.value = valorFormatado;
    });
});
