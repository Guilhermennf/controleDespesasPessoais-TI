const recoverInputName = document.getElementById("nome");
const recoverInputLastName = document.getElementById("sobrenome");
const recoverInputEmail = document.getElementById("email");
const recoverInputPassword = document.getElementById("senha");
const recoverInputConfirmPassword = document.getElementById("confirmar-senha");
const recoverInputPhone = document.getElementById("telefone");
const recoverButtonCreate = document.querySelector("button[type='submit']");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

recoverButtonCreate.addEventListener("click", (event) => {
    event.preventDefault();
    includeNewUser();
});

function includeNewUser() {
    const objUser = insertValuesInObject(
        recoverInputName,
        recoverInputLastName,
        recoverInputEmail,
        recoverInputPassword,
        recoverInputConfirmPassword,
        recoverInputPhone
    );

    if (objUser === null) {
        return;
    }

    if (validateIfFieldEmpty(objUser)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos obrigatórios.",
        });
        return;
    }

    if (!validateEmail(objUser.email)) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, insira um e-mail válido.",
        });
        return;
    }

    const userExists = validateUserInLocalStorage(objUser);
    if (userExists) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Email já está cadastrado.",
        });
        return;
    }

    saveUserToLocalStorage(objUser);
    Swal.fire({
        icon: "success",
        title: "Sucesso!",
        text: "Usuário cadastrado com sucesso!",
    }).then(() => {
        clearInputFields();
        window.location.href = "../Login/Login.html";
    });
}

function validateIfFieldEmpty(user) {
    for (let key in user) {
        if (user.hasOwnProperty(key) && user[key] === "") {
            if (key !== "telefone") {
                return true;
            }
        }
    }
    return false;
}

function validateEmail(email) {
    return emailRegex.test(email);
}

function validateUserInLocalStorage(newUser) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some((user) => user.email === newUser.email);
}

function saveUserToLocalStorage(user) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function insertValuesInObject(
    recoverInputName,
    recoverInputLastName,
    recoverInputEmail,
    recoverInputPassword,
    recoverInputConfirmPassword,
    recoverInputPhone
) {
    const password = recoverInputPassword.value;
    const confirmPassword = recoverInputConfirmPassword.value;

    if (password !== confirmPassword) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "As senhas não coincidem.",
        });
        return null;
    }

    let newUser = {
        name: recoverInputName.value,
        lastName: recoverInputLastName.value,
        email: recoverInputEmail.value,
        cellphone: recoverInputPhone.value,
        password: password,
    };

    return newUser;
}

function clearInputFields() {
    // Define o valor de todos os campos de entrada para vazio
    recoverInputName.value = "";
    recoverInputLastName.value = "";
    recoverInputEmail.value = "";
    recoverInputPassword.value = "";
    recoverInputConfirmPassword.value = "";
    recoverInputPhone.value = "";
}
