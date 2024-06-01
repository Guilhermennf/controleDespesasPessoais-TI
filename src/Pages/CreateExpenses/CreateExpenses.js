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

    document
        .getElementById("expenseForm")
        .addEventListener("submit", function (event) {
            event.preventDefault();

            // Coleta os valores dos campos do formulário
            const descricao = document.getElementById("descricao").value;
            const categoria = document.getElementById("categoria").value;
            const data = document.getElementById("data").value;
            const valor = document.getElementById("valor").value;

            // Cria um objeto com os valores
            const expense = {
                descricao: descricao,
                categoria: categoria,
                data: data,
                valor: valor,
            };

            // Obtém os dados existentes no localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];
            let userIndex = users.findIndex((user) => user.logado === true);
            if (userIndex !== -1) {
                if (!users[userIndex].expenses) {
                    users[userIndex].expenses = [];
                }
                users[userIndex].expenses.push(expense);
                localStorage.setItem("users", JSON.stringify(users));

                // Exibe a mensagem de sucesso usando SweetAlert2
                Swal.fire({
                    icon: "success",
                    title: "Despesa Cadastrada",
                    text: "Sua despesa foi cadastrada com sucesso!",
                }).then(() => {
                    listarDespesas();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Erro",
                    text: "Nenhum usuário logado encontrado!",
                });
            }
        });

    //     // Coleta os valores dos campos do formulário
    //     const descricao = document.getElementById("descricao").value;
    //     const categoria = document.getElementById("categoria").value;
    //     const data = document.getElementById("data").value;
    //     const valor = document.getElementById("valor").value;

    //     // Cria um objeto com os valores
    //     const expense = {
    //         descricao: descricao,
    //         categoria: categoria,
    //         data: data,
    //         valor: valor,
    //     };

    //     // Obtém os dados existentes no localStorage
    //     let expenses = localStorage.getItem("expenses");
    //     if (expenses) {
    //         expenses = JSON.parse(expenses);
    //     } else {
    //         expenses = [];
    //     }

    //     // Adiciona o novo objeto ao array
    //     expenses.push(expense);

    //     // Salva o array atualizado no localStorage
    //     localStorage.setItem("expenses", JSON.stringify(expenses));

    //     // Limpa o formulário
    //     document.getElementById("expenseForm").reset();

    //     // Exibe a mensagem de sucesso usando SweetAlert2
    //     Swal.fire({
    //         icon: "success",
    //         title: "Despesa Cadastrada",
    //         text: "Sua despesa foi cadastrada com sucesso!",
    //     });
    // });
});
