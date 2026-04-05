const botaoSalvar = document.getElementById("btn-salvar");
botaoSalvar.addEventListener("click", salvar);

// http://127.0.0.1:5501/categoria-form.html?id=68
const urlParmas = new URLSearchParams(window.location.search);
const idParaEditar = urlParmas.get("id");


function salvar() {
    let campoNome = document.getElementById("input-nome");
    let nome = campoNome.value;

    // payload é o corpo da requisição (enviar para o back-end)
    let payload = {
        "nome": nome
    }

    if (idParaEditar === null) {
        cadastrar(payload);
    } else {
        editar(payload);
    }
}

function editar(payload) {
    fetch(`https://api.franciscosensaulas.com/api/v1/biblioteca/categorias/${idParaEditar}`, {
        "method": "PUT",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then(() => {
            alert("Categoria alterada com sucesso");
        })
        .catch((erro) => {
            alert("Não foi possível alterar a categoria");
        });
}

function cadastrar(payload) {
    fetch("https://api.franciscosensaulas.com/api/v1/biblioteca/categorias", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
        .then((data) => {
            return data.json();
        })
        .then(() => {
            alert("Categoria cadastrada com sucesso");
        })
        .catch((erro) => {
            alert("Não foi possível cadastrar a categoria");
        });
}

function carregarCategoriaParaEditar() {
    fetch(`https://api.franciscosensaulas.com/api/v1/biblioteca/categorias/${idParaEditar}`)
        .then(dados => dados.json())
        .then((categoria) => {
            const campoNome = document.getElementById("input-nome");
            campoNome.value = categoria.nome;
        })
        .catch(erro => {
            alert("Ocorreu um erro ao carregar os dados da categoria");
        })
}

if (idParaEditar !== null) {
    carregarCategoriaParaEditar();
}