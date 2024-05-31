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

    var inputValorInicial = document.getElementById("valor_inicial");
    var inputValorTotal = document.getElementById("valor_total");

    function formatCurrencyInput(input) {
        input.addEventListener("input", function (e) {
            var valorFormatado = this.value.replace(/\D/g, "");

            if (valorFormatado === "") {
                this.value = "";
            } else {
                valorFormatado = (
                    parseFloat(valorFormatado) / 100
                ).toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                });

                this.value = valorFormatado;
            }
        });
    }

    formatCurrencyInput(inputValorInicial);
    formatCurrencyInput(inputValorTotal);

    const form = document.getElementById("goal-form");
    const goalList = document.getElementById("goal-list");
    const addGoalBtn = document.getElementById("add-goal-btn");

    const loadGoals = () => {
        const goals = JSON.parse(localStorage.getItem("goals")) || [];
        goalList.innerHTML = "";
        goals.forEach((goal) => {
            addGoalToDOM(goal);
        });
    };

    const saveGoals = (goals) => {
        localStorage.setItem("goals", JSON.stringify(goals));
    };

    const deleteGoal = (goalId) => {
        let goals = JSON.parse(localStorage.getItem("goals")) || [];
        goals = goals.filter((goal) => goal.id !== goalId);
        saveGoals(goals);
        loadGoals();
        Swal.fire("Excluído!", "Sua meta foi excluída.", "success");
    };

    const addGoalToDOM = (goal) => {
        const goalDiv = document.createElement("div");
        goalDiv.className = "lg:w-1/2 py-2 pr-3 mb-4";
        goalDiv.innerHTML = `
            <div class="bg-white rounded-3xl p-5" style="background-color: #61ffb3">
                <h3 class="text-lg font-semibold mb-2 flex items-center">
                    ${goal.nome}
                    ${
                        goal.destaque
                            ? `<svg width="12" height="12" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg" class="ml-2">
                                <path d="M6 0L7.34708 4.1459H11.7063L8.17963 6.7082L9.52671 10.8541L6 8.2918L2.47329 10.8541L3.82037 6.7082L0.293661 4.1459H4.65292L6 0Z" fill="#667EFF"/>
                            </svg>`
                            : ""
                    }
                </h3>
                <div class="flex justify-between items-center">
                    <div class="relative w-full bg-gray-200 rounded-full h-4">
                        <div class="absolute left-0 top-0 rounded-full h-4" style="width: ${
                            goal.progresso
                        }%; background-color: #667eff;"></div>
                    </div>
                </div>
                <div class="flex justify-between">
                    <p class="text-sm text-gray-600" style="color: #667eff">R$ ${
                        goal.valorAtual
                    }</p>
                    <p class="text-sm text-gray-600" style="color: #667eff">R$ ${
                        goal.valorTotal
                    }</p>
                </div>

                <div class="flex flex-wrap justify-between py-2">
                    <div class="flex flex-col" style="color: #667eff">
                        <label>Data Limite</label>
                        <input
                            class="rounded-xl w-full bg-transparent"
                            type="date"
                            style="
                                border-color: #667eff;
                                -webkit-calendar-picker-indicator: #667eff;
                            "
                            value="${goal.dataLimite}"
                        />
                    </div>
                    <button
                    class="flex items-center justify-center ml-1 mt-auto mb-2 delete-goal-btn"
                    data-id="${goal.id}"
                >
                    <div class="grid mr-4 place-items-center">
                        <svg
                            width="19"
                            height="23"
                            viewBox="0 0 19 23"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0 4.52203C0 3.79362 0.590493 3.20312 1.3189 3.20312H17.0986C17.827 3.20312 18.4175 3.79362 18.4175 4.52203V5.5112C18.4175 5.82338 18.1645 6.07645 17.8523 6.07645H0.565244C0.253069 6.07645 0 5.82338 0 5.5112V4.52203Z"
                                fill="#667EFF"
                            />
                            <path
                                d="M2.63782 19.8307H15.7797V20.5372C15.7797 21.7339 14.8096 22.704 13.613 22.704H4.80458C3.60791 22.704 2.63782 21.7339 2.63782 20.5372V19.8307Z"
                                fill="#667EFF"
                            />
                            <path
                                d="M10.6924 0H7.77201C6.60135 0 5.65234 0.949007 5.65234 2.11967V3.20305H7.13611V2.35518C7.15966 2.14322 7.33394 1.71457 7.84266 1.69573C8.35138 1.67689 9.97018 1.68788 10.716 1.69573C10.9123 1.71928 11.3048 1.88415 11.3048 2.35518V3.20305H12.8121V2.11967C12.8121 0.949007 11.8631 0 10.6924 0Z"
                                fill="#667EFF"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M16.9573 6.54749H1.50732L2.54361 19.3597H15.8975L16.9573 6.54749ZM5.50472 9.47351C5.45579 9.13888 5.14486 8.90726 4.81023 8.95619C4.47559 9.00511 4.24398 9.31604 4.2929 9.65068L5.4705 17.7054C5.51942 18.04 5.83035 18.2717 6.16499 18.2227C6.49962 18.1738 6.73123 17.8629 6.68231 17.5282L5.50472 9.47351ZM12.2997 18.2228C12.6343 18.2717 12.9452 18.0401 12.9942 17.7055L14.1718 9.65073C14.2207 9.3161 13.9891 9.00516 13.6544 8.95624C13.3198 8.90732 13.0089 9.13893 12.9599 9.47356L11.7824 17.5283C11.7334 17.8629 11.965 18.1739 12.2997 18.2228ZM9.84476 17.6404C9.84476 17.9786 9.5706 18.2528 9.23241 18.2528C8.89422 18.2528 8.62006 17.9786 8.62006 17.6404V9.51505C8.62006 9.17686 8.89422 8.9027 9.23241 8.9027C9.5706 8.9027 9.84476 9.17686 9.84476 9.51505V17.6404Z"
                                fill="#667EFF"
                            />
                        </svg>
                    </div>
                </button>
                </div>
                <div class="py-2">
                <button class="underline">Editar</button>
            </div>
            </div>
        `;
        goalList.appendChild(goalDiv);

        goalDiv
            .querySelector(".delete-goal-btn")
            .addEventListener("click", function () {
                const goalId = this.getAttribute("data-id");
                Swal.fire({
                    title: "Tem certeza?",
                    text: "Você não poderá reverter isso!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#667eff",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sim, excluir!",
                    cancelButtonText: "Cancelar",
                }).then((result) => {
                    if (result.isConfirmed) {
                        deleteGoal(goalId);
                    }
                });
            });

        const editGoal = (goal) => {
            document.getElementById("nome_meta").value = goal.nome;
            document.getElementById("valor_inicial").value = formatCurrency(
                goal.valorAtual
            );
            document.getElementById("valor_total").value = formatCurrency(
                goal.valorTotal
            );
            document.getElementById("data_limite").value = goal.dataLimite;
            document.getElementById("destaque").checked = goal.destaque;

            form.dataset.editingId = goal.id;

            document.getElementById("edit-goal-btn").style.display =
                "inline-flex";
            document.getElementById("cancel-edit-btn").style.display =
                "inline-flex";
            document.getElementById("add-goal-btn").style.display = "none";
        };

        const formatCurrency = (value) => {
            return (
                "R$ " +
                value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })
            );
        };

        const saveEditedGoal = () => {
            const goals = JSON.parse(localStorage.getItem("goals")) || [];
            const editingId = form.dataset.editingId;
            const editedGoalIndex = goals.findIndex(
                (goal) => goal.id === editingId
            );

            if (editedGoalIndex !== -1) {
                goals[editedGoalIndex].nome =
                    document.getElementById("nome_meta").value;

                const valorInicial = parseFloat(
                    document
                        .getElementById("valor_inicial")
                        .value.replace("R$", "")
                        .replace(".", "")
                        .replace(",", ".")
                );
                goals[editedGoalIndex].valorAtual = valorInicial;

                const valorTotal = parseFloat(
                    document
                        .getElementById("valor_total")
                        .value.replace("R$", "")
                        .replace(".", "")
                        .replace(",", ".")
                );
                goals[editedGoalIndex].valorTotal = valorTotal;

                goals[editedGoalIndex].dataLimite =
                    document.getElementById("data_limite").value;
                goals[editedGoalIndex].destaque =
                    document.getElementById("destaque").checked;

                const progresso = (valorInicial / valorTotal) * 100;
                goals[editedGoalIndex].progresso = progresso;

                localStorage.setItem("goals", JSON.stringify(goals));

                form.reset();
                delete form.dataset.editingId;

                document.getElementById("edit-goal-btn").style.display = "none";
                document.getElementById("cancel-edit-btn").style.display =
                    "none";
                document.getElementById("add-goal-btn").style.display =
                    "inline-flex";

                loadGoals();
            }
        };

        const editButton = goalDiv.querySelector("button.underline");
        editButton.addEventListener("click", function () {
            editGoal(goal);
        });

        document
            .getElementById("edit-goal-btn")
            .addEventListener("click", () => {
                saveEditedGoal();
            });

        document
            .getElementById("cancel-edit-btn")
            .addEventListener("click", () => {
                form.reset();
                delete form.dataset.editingId;
                document.getElementById("edit-goal-btn").style.display = "none";
                document.getElementById("cancel-edit-btn").style.display =
                    "none";
                document.getElementById("add-goal-btn").style.display =
                    "inline-flex";
            });

        addGoalBtn.addEventListener("click", () => {
            if (form.dataset.editingId) {
                saveEditedGoal();
            }
        });
    };

    const addGoal = (goal) => {
        const goals = JSON.parse(localStorage.getItem("goals")) || [];
        goals.push(goal);
        saveGoals(goals);
        addGoalToDOM(goal);
    };

    const validateFields = () => {
        const nome = document.getElementById("nome_meta").value.trim();
        const valorInicial = parseFloat(
            document
                .getElementById("valor_inicial")
                .value.replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
        );
        const valorTotal = parseFloat(
            document
                .getElementById("valor_total")
                .value.replace("R$", "")
                .replace(".", "")
                .replace(",", ".")
        );
        const dataLimite = document.getElementById("data_limite").value;
        const isDestaque = document.getElementById("destaque").checked;
        let isValid = true;

        const goals = JSON.parse(localStorage.getItem("goals")) || [];
        const destaqueCount = goals.filter((goal) => goal.destaque).length;

        if (!nome) {
            isValid = false;
            Swal.fire("Erro", "Por favor, preencha o nome da meta.", "error");
        } else if (!valorInicial || isNaN(valorInicial)) {
            isValid = false;
            Swal.fire(
                "Erro",
                "Por favor, preencha o valor inicial corretamente.",
                "error"
            );
        } else if (!valorTotal || isNaN(valorTotal)) {
            isValid = false;
            Swal.fire(
                "Erro",
                "Por favor, preencha o valor total corretamente.",
                "error"
            );
        } else if (valorInicial >= valorTotal) {
            isValid = false;
            Swal.fire(
                "Erro",
                "O valor inicial deve ser menor que o valor total.",
                "error"
            );
        } else if (isDestaque && destaqueCount >= 2) {
            isValid = false;
            Swal.fire("Erro", "Você já possui duas metas destaque.", "error");
        } else if (!dataLimite) {
            isValid = false;
            Swal.fire("Erro", "Por favor, selecione uma data limite.", "error");
        }

        return isValid;
    };

    addGoalBtn.addEventListener("click", () => {
        if (validateFields()) {
            const nome = document.getElementById("nome_meta").value;
            const valorInicial = parseFloat(
                document
                    .getElementById("valor_inicial")
                    .value.replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
            );
            const valorTotal = parseFloat(
                document
                    .getElementById("valor_total")
                    .value.replace("R$", "")
                    .replace(".", "")
                    .replace(",", ".")
            );
            const dataLimite = document.getElementById("data_limite").value;
            const destaque = document.getElementById("destaque").checked;

            const progresso = (valorInicial / valorTotal) * 100;

            const goal = {
                id: Date.now().toString(),
                nome: nome,
                valorAtual: valorInicial,
                valorTotal: valorTotal,
                dataLimite: dataLimite,
                destaque: destaque,
                progresso: progresso,
            };

            addGoal(goal);
            form.reset();
        }
    });

    loadGoals();
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
