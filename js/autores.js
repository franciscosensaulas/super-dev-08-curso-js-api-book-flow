const API_AUTORES_BASE_URL = "https://api.franciscosensaulas.com/api/v1/biblioteca/autores";

const tbodyAutores = document.getElementById("tbody-autores");

function carregarAutores() {
    tbodyAutores.innerHTML = "";
    fetch(API_AUTORES_BASE_URL)
        .then(dados => {
            return dados.json()
        })
        .then(autores => {
            for (let i = 0; i < autores.length; i += 1) {
                const autor = autores[i];
                criarLinha(autor);
            }
        })
}

function criarLinha(autor) {
    const data = new Date(autor.dataNascimento);

    const dataNascimentoFormatada = data.toLocaleDateString("pt-BR");
    const tr = document.createElement("tr");
    tr.innerHTML = `<tr>
                  <td class="cell-id">${autor.id}</td>
                  <td>${autor.nome}</td>
                  <td>${autor.nacionalidade}</td>
                  <td>${dataNascimentoFormatada}</td>
                  <td class="cell-actions">
                    <a class="btn-icon btn-icon-edit" href="/autor-form.html?id=${autor.id}">
                        <i class="fas fa-pen"></i>
                    </a>
                    <button class="btn-icon btn-icon-danger botao-apagar" data-id="${autor.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>`;
    tbodyAutores.appendChild(tr);
}

carregarAutores();