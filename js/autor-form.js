const API_AUTORES_BASE_URL = "https://api.franciscosensaulas.com/api/v1/biblioteca/autores";

let formAutores = document.getElementById("form-autor");
formAutores.addEventListener("submit", salvar);

function salvar(event){
    // Ignora o submit da tag form
    event.preventDefault();

    let autorNome = document.getElementById("input-nome").value;
    let autorNacionalidade = document.getElementById("input-nacionalidade").value;
    let autorDataNascimento = document.getElementById("input-data-nascimento").value;
    
    let payload = {
        "nome": autorNome,
        "nacionalidade": autorNacionalidade,
        "dataNascimento": autorDataNascimento
    }

    fetch(API_AUTORES_BASE_URL, {
        "method": "POST",
        "headers": { 
            "Content-Type": "application/json"
        },
        "body": JSON.stringify(payload)
    })
    .then(dados => dados.json())
    .then(_ => window.location.href = "/autores.html")
    .catch(erro => {
        console.error(erro);
        alert("Ocorreu um erro ao cadastrar o autor")
    })
}