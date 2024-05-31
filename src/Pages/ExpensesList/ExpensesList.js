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
    let despesas = JSON.parse(localStorage.getItem("expenses")) || [];
    despesas.splice(index, 1);
    localStorage.setItem("expenses", JSON.stringify(despesas));
    listarDespesas();
}

// Inicializa a listagem de despesas ao carregar a página
window.onload = listarDespesas;
