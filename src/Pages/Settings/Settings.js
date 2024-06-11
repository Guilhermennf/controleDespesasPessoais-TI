document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const loggedUser = users.find((user) => user.logado);

    if (!loggedUser) {
        window.location.href = "../Login/Login.html";
    }
    const form = document.querySelector("form");

    document.getElementById("first-name").value = loggedUser.name;
    document.getElementById("last-name").value = loggedUser.lastName;
    document.getElementById("phone").value = loggedUser.cellphone;
    document.getElementById("email").value = loggedUser.email;

    const nameElement = document.getElementById("name_account");
    const emailElement = document.getElementById("email_account");

    nameElement.textContent = `${loggedUser.name} ${loggedUser.lastName}`;
    emailElement.textContent = loggedUser.email;

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

    document
        .getElementById("confirmBtn")
        .addEventListener("click", function () {
            const alertValue = parseInt(
                document.getElementById("percent").value
            );

            if (!isNaN(alertValue)) {
                let users = JSON.parse(localStorage.getItem("users")) || [];
                for (let user of users) {
                    if (user.logado) {
                        user.alert = alertValue;
                        break;
                    }
                }
                localStorage.setItem("users", JSON.stringify(users));
                Swal.fire({
                    title: "Sucesso!",
                    text: "Alerta salvo com sucesso!",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Erro!",
                    text: "Por favor, insira um número válido.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        });
});
