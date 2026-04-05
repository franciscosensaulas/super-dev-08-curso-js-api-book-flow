const API_LIVROS_BASE_URL = "https://api.franciscosensaulas.com/api/v1/biblioteca/livros";

const tbodyLivros = document.getElementById("tbody-livros");

function carregarLivros() {
    tbodyLivros.innerHTML = "";

    fetch(API_LIVROS_BASE_URL)
        .then(response => response.json())
        .then(livros => {
            for (let i = 0; i < livros.length; i++) {
                const livro = livros[i];
                criarLinha(livro);
            }
        })
        .catch(error => {
            console.error("Erro ao carregar livros:", error);
        });
}

function criarLinha(livro) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td class="cell-id">${livro.id}</td>
        <td>${livro.titulo || "-"}</td>
        <td>${livro.autor?.nome || "-"}</td>
        <td>${livro.categoria?.nome || "-"}</td>
        <td>${livro.anoPublicacao || "-"}</td>
        <td>${livro.isbn || "-"}</td>
        <td>${livro.quantidade ?? 0}</td>
        <td class="cell-actions">
            <a class="btn-icon btn-icon-edit" href="/livro-form.html?id=${livro.id}">
                <i class="fas fa-pen"></i>
            </a>
            <button class="btn-icon btn-icon-danger botao-apagar" data-id="${livro.id}">
                <i class="fas fa-trash"></i>
            </button>
        </td>
    `;

    tbodyLivros.appendChild(tr);
}

// Inicializa
carregarLivros();