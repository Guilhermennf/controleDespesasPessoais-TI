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
