document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedUser = users.find((user) => user.logado);

    if (!loggedUser) {
        window.location.href = "../Login/Login.html";
    }

    const welcomeMessage = document.querySelector(".font-semibold");
    welcomeMessage.textContent = `Bem-vindo, ${loggedUser.name}`;

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

    function parseCurrency(value) {
        return parseFloat(
            value.replace("R$", "").replace(".", "").replace(",", ".")
        );
    }

    function formatCurrency(value) {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
        });
    }

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const loggedInUser = users.find((user) => user.logado);

    if (loggedInUser) {
        const currentMonthExpenses = loggedInUser.expenses.filter((expense) => {
            const expenseDate = new Date(expense.data);
            const expenseMonth = expenseDate.getMonth() + 1;
            const expenseYear = expenseDate.getFullYear();
            return expenseMonth === currentMonth && expenseYear === currentYear;
        });

        const totalExpenses = currentMonthExpenses.reduce((total, expense) => {
            return total + parseCurrency(expense.valor);
        }, 0);

        const saldoElement = document.getElementById("saldo-atual");
        saldoElement.textContent = formatCurrency(totalExpenses);

        console.log(loggedInUser.alert);

        if (loggedInUser.alert < totalExpenses) {
            const alertaElement = document.getElementById("alerta-id");
            alertaElement.textContent = "Você está gastando muito!";
        }
    }
});
