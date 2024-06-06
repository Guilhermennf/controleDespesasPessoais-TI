function listarDespesas() {
    const resultados = document.getElementById("resultados");
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((user) => user.logado === true) || {};
    let despesas = user.expenses || [];

    resultados.innerHTML = `
    <div>Descrição</div>
    <div>Categoria</div>
    <div>Data</div>
    <div>Valor</div>
    <div>Excluir</div>
`;

    despesas.forEach((despesa, index) => {
        const despesaElement = document.createElement("div");
        despesaElement.classList.add(
            "flex",
            "flex-wrap",
            "w-full",
            "justify-between",
            "mt-2"
        );
        despesaElement.innerHTML = `
        <div>${despesa.descricao}</div>
        <div>${despesa.categoria}</div>
        <div>${formatarData(despesa.data)}</div>
        <div>${despesa.valor}</div>
        <div><button onclick="excluirDespesa(${index})">Excluir</button></div>
    `;
        resultados.appendChild(despesaElement);
    });
}

function filtrarDespesas() {
    const descricaoFiltro = document
        .getElementById("descricao-filtro")
        .value.toLowerCase();
    const categoriaFiltro = document.getElementById("categoria-filtro").value;
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let user = users.find((user) => user.logado === true) || {};
    let despesas = user.expenses || [];
    const despesasFiltradas = despesas.filter((despesa) => {
        return (
            (descricaoFiltro === "" ||
                despesa.descricao.toLowerCase().includes(descricaoFiltro)) &&
            (categoriaFiltro === "" || despesa.categoria === categoriaFiltro)
        );
    });

    listarDespesasFiltradas(despesasFiltradas);
}

function listarDespesasFiltradas(despesas) {
    const resultados = document.getElementById("resultados");
    resultados.innerHTML = `
    <div>Descrição</div>
    <div>Categoria</div>
    <div>Data</div>
    <div>Valor</div>
    <div>Excluir</div>
`;

    despesas.forEach((despesa, index) => {
        const despesaElement = document.createElement("div");
        despesaElement.classList.add(
            "flex",
            "flex-wrap",
            "w-full",
            "justify-between",
            "mt-2"
        );
        despesaElement.innerHTML = `
        <div>${despesa.descricao}</div>
        <div>${despesa.categoria}</div>
        <div>${formatarData(despesa.data)}</div>
        <div>${despesa.valor}</div>
        <div><button onclick="excluirDespesa(${index})">Excluir</button></div>
    `;
        resultados.appendChild(despesaElement);
    });
}

function formatarData(data) {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, "0");
    const mes = String(dataObj.getMonth() + 1).padStart(2, "0");
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function excluirDespesa(index) {
    Swal.fire({
        title: "Tem certeza?",
        text: "Você não poderá reverter isso!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            const loggedUser = users.find((user) => user.logado);

            if (loggedUser && loggedUser.expenses) {
                loggedUser.expenses.splice(index, 1);
                localStorage.setItem("users", JSON.stringify(users));
                listarDespesas();
                Swal.fire("Excluído!", "A despesa foi excluída.", "success");
            }
        }
    });
}

// Inicializa a listagem de despesas ao carregar a página
window.onload = listarDespesas;

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
