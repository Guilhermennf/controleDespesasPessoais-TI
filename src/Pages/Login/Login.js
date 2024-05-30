const loginInputEmail = document.getElementById("email");
const loginInputPassword = document.getElementById("password");
const loginButton = document.querySelector("button[type='submit']");

loginButton.addEventListener("click", (event) => {
    event.preventDefault();
    authenticateUser();
});

function authenticateUser() {
    const email = loginInputEmail.value;
    const password = loginInputPassword.value;

    if (!email || !password) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos.",
        });
        return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userIndex = users.findIndex(
        (user) => user.email === email && user.password === password
    );

    if (userIndex !== -1) {
        users[userIndex].logado = true;
        localStorage.setItem("users", JSON.stringify(users));
        window.location.href = "../Home/Home.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email ou senha incorretos. Por favor, tente novamente.",
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll("[data-tabs-target]");

    tabs.forEach((tab) => {
        tab.addEventListener("click", () => {
            const target = document.querySelector(tab.dataset.tabsTarget);
            const allTabs = document.querySelectorAll("[data-tabs-target]");
            const allTabContents = document.querySelectorAll('[id^="styled-"]');

            allTabs.forEach((tab) => {
                tab.classList.remove("tab-active");
                tab.classList.add("tab-inactive");
            });

            allTabContents.forEach((tabContent) => {
                tabContent.classList.add("hidden");
            });

            tab.classList.add("tab-active");
            tab.classList.remove("tab-inactive");
            target.classList.remove("hidden");
        });
    });
});

document.addEventListener("DOMContentLoaded", function (event) {
    event.preventDefault();

    document
        .getElementById("botao-enviar-link")
        .addEventListener("click", function (event) {
            event.preventDefault();

            // Recupere o email digitado
            const email = document.getElementById("email-recuperacao").value;

            // Verifique se o campo de email está vazio
            if (email?.trim() === "") {
                // Se estiver vazio, exiba uma mensagem de erro
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Por favor, informe um endereço de email.",
                });
            } else {
                // Caso contrário, abra o modal para a nova senha
                document
                    .getElementById("modal-nova-senha")
                    .classList.remove("hidden");
            }
        });

    document
        .getElementById("enviar-nova-senha")
        .addEventListener("click", function (event) {
            event.preventDefault();

            const users = JSON.parse(localStorage.getItem("users"));
            const email = document.getElementById("email-recuperacao").value;

            const novaSenha = document.getElementById("nova-senha").value;

            const userIndex = users.findIndex(
                (user) => user.email?.toLowerCase() === email?.toLowerCase()
            );
            if (userIndex !== -1) {
                users[userIndex].password = novaSenha;

                const updatedUsers = JSON.stringify(users);

                localStorage.setItem("users", updatedUsers);

                document
                    .getElementById("modal-nova-senha")
                    .classList.add("hidden");

                Swal.fire({
                    icon: "success",
                    title: "Senha Alterada",
                    text: "Sua senha foi alterada com sucesso!",
                }).then(() => {
                    const loginTab =
                        document.getElementById("login-styled-tab");
                    loginTab.click();
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "O email fornecido não está cadastrado!",
                });
            }
        });

    document
        .getElementById("fechar-modal")
        .addEventListener("click", function (event) {
            event.preventDefault();

            document.getElementById("modal-nova-senha").classList.add("hidden");
        });
});
