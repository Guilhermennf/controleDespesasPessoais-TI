const loginInputEmail = document.getElementById("email");
const loginInputPassword = document.getElementById("password");
const loginButton = document.querySelector("button[type='submit']");

loginButton.addEventListener("click", (event) => {
    event.preventDefault(); // Evitar o recarregamento da página
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
    const user = users.find(
        (user) => user.email === email && user.password === password
    );

    if (user) {
        window.location.href = "../Home/Home.html";
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Email ou senha incorretos. Por favor, tente novamente.",
        });
    }
}
