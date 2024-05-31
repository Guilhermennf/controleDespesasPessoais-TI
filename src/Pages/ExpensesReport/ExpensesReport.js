function formatCurrency(value) {
    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(value);
}

const mesesDoAno = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

const limitesDeGasto = [
    5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
];
const valoresGastos = [
    5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
];
const saldosFinais = [
    5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000,
];

const container = document.querySelector(".container");

const estiloInfo = {
    color: "#667EFF",
    fontWeight: "bold",
};

mesesDoAno.forEach((mes, index) => {
    const bloco = document.createElement("div");
    bloco.classList.add("flex", "justify-around", "p-3", "mt-5");

    const nomeMes = document.createElement("div");
    nomeMes.classList.add("flex", "items-end", "text-center");
    const nomeMesSpan = document.createElement("span");
    nomeMesSpan.classList.add(
        "rounded-2xl",
        "px-5",
        "flex",
        "items-center",
        "justify-center"
    );
    nomeMesSpan.style.backgroundColor = "#d8deff";
    nomeMesSpan.style.color = "#667eff";
    nomeMesSpan.style.width = "100px";
    nomeMesSpan.textContent = mes;
    nomeMes.appendChild(nomeMesSpan);
    bloco.appendChild(nomeMes);

    ["Limite de gasto", "Valor gasto", "Saldo final"].forEach((titulo, i) => {
        const info = document.createElement("div");
        info.classList.add("flex", "flex-col", "items-center", "text-center");
        const tituloSpan = document.createElement("span");
        tituloSpan.textContent = titulo;
        const valorSpan = document.createElement("span");
        valorSpan.classList.add("rounded-2xl", "px-5", "flex", "items-center");

        Object.assign(tituloSpan.style, estiloInfo);
        Object.assign(valorSpan.style, estiloInfo);

        switch (i) {
            case 0:
                valorSpan.style.backgroundColor = "#61ffb3";
                valorSpan.textContent = formatCurrency(limitesDeGasto[index]);
                break;
            case 1:
                valorSpan.style.backgroundColor = "#ffaaaa";
                valorSpan.textContent = formatCurrency(valoresGastos[index]);
                break;
            case 2:
                valorSpan.style.backgroundColor = "#fff175";
                valorSpan.textContent = formatCurrency(saldosFinais[index]);
                break;
        }
        info.appendChild(tituloSpan);
        info.appendChild(valorSpan);
        bloco.appendChild(info);
    });

    container.appendChild(bloco);
});

document.addEventListener("DOMContentLoaded", function () {
    function checkLoginStatus() {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const loggedInUser = users.find((user) => user.logado === true);

        if (!loggedInUser) {
            window.location.href = "../Login/Login.html";
        }
    }

    checkLoginStatus();
});

document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedUser = users.find((user) => user.logado);

    if (!loggedUser) {
        window.location.href = "../Login/Login.html";
    }

    const logoutButton = document.getElementById("logoutButton");

    logoutButton.addEventListener("click", function (event) {
        event.preventDefault();

        users.forEach((user) => {
            if (user.logado) {
                user.logado = false;
            }
        });

        localStorage.setItem("users", JSON.stringify(users));

        window.location.href = "../Login/Login.html";
    });
});
