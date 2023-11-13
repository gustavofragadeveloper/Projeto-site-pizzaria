document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.getElementById("email");
    const cpfInput = document.getElementById("cpf");
    const senhaInput = document.getElementById("senha");
    const confirmarSenhaInput = document.getElementById("confirmarSenha");
    const dataNascimentoInput = document.getElementById("dataNascimento");
    const tipoContaSelect = document.getElementById("tipoConta");
    const nomeCompletoInput = document.getElementById("nomeCompleto");
    const cadastrarButton = document.getElementById("cadastrarButton");
    const cadastroForm = document.getElementById("cadastroForm");

    dataNascimentoInput.addEventListener("input", function (event) {
        const input = event.target;
        let value = input.value.replace(/\D/g, ""); 
        const formattedValue = [];

        if (value.length > 2) {
            formattedValue.push(value.slice(0, 2));
            value = value.slice(2);
        }

        if (value.length > 2) {
            formattedValue.push(value.slice(0, 2));
            value = value.slice(2);
        }

        if (value.length > 0) {
            formattedValue.push(value);
        }

        input.value = formattedValue.join("/");
    });

    cadastrarButton.addEventListener("click", function (event) {
        event.preventDefault();

        const inputs = cadastroForm.querySelectorAll("input[type='text']");
        let camposPreenchidos = true;
        inputs.forEach(function (input) {
            if (input.value.trim() === "") {
                camposPreenchidos = false;
                return;
            }
        });

        if (!camposPreenchidos) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const nomeCompleto = nomeCompletoInput.value;
        const nomes = nomeCompleto.split(" ");
        if (nomes.length < 2) {
            alert("Por favor, preencha seu nome completo.");
            return;
        }

        const email = emailInput.value;
        const emailRegex = /^[A-Za-z0-9._%+-]+@(gmail|hotmail|yahoo|icloud)\.com$/i;
        if (!emailRegex.test(email)) {
            alert("Por favor, insira um email válido com um dos seguintes domínios: gmail.com, hotmail.com, yahoo.com ou icloud.com.");
            return;
        }

        const cpf = cpfInput.value.replace(/[^\d]/g, "");
        if (cpf.length !== 11) {
            alert("Por favor, insira um CPF válido com 11 dígitos.");
            return;
        }

        const dataNascimento = dataNascimentoInput.value;
        const dataNascimentoRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dataNascimentoRegex.test(dataNascimento)) {
            alert("A data de nascimento deve ser digitada no formato DD/MM/AAAA (exemplo: 01/01/2000).");
            return;
        }

        const senha = senhaInput.value;
        const confirmarSenha = confirmarSenhaInput.value;
        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem.");
            return;
        }

        const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@\-_/]).{8,}$/;
        if (!senhaRegex.test(senha)) {
            alert("A senha deve ter no mínimo 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 letra minúscula e um dos seguintes símbolos: @, -, _, /");
            return;
        }

        alert("Cadastro concluído!");
    });
});