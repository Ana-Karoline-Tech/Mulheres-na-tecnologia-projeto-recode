const btnSignin = document.querySelector("#signin");  // Botão ALUNAS
const btnSignup = document.querySelector("#signup");  // Botão EMPRESAS
const body = document.querySelector("body");

btnSignin.addEventListener("click", function () {
    body.classList.remove("conteudo-cadastro-js");
    body.classList.add("conteudo-login-js");
});

btnSignup.addEventListener("click", function () {
    body.classList.remove("conteudo-login-js");
    body.classList.add("conteudo-cadastro-js");
});
