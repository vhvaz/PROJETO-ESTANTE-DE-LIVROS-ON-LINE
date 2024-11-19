const BASE_URL =
  "https://api-books-dot-api-samples-423102.uc.r.appspot.com/api";
const TOKEN = "110323";

// Função para buscar todos os livros
export async function getAllBooks() {
  const requestInit = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  try {
    console.log("Iniciando requisição para buscar todos os livros...");
    const response = await fetch(`${BASE_URL}/books`, requestInit);

    if (!response.ok) {
      throw new Error(
        `Erro ${response.status}: Não foi possível carregar os livros`
      );
    }

    const data = await response.json();
    console.log("Livros carregados com sucesso:", data);
    return data;
  } catch (error) {
    console.error("Erro ao buscar todos os livros:", error);
    throw error;
  }
}

// Função para filtrar os livros localmente
export async function searchBooks(query) {
  try {
    const books = await getAllBooks();
    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase())
    );
    console.log("Livros filtrados na busca:", filteredBooks);
    return filteredBooks;
  } catch (error) {
    console.error("Erro ao filtrar livros:", error);
    return [];
  }
}

// Função para atualizar a estante de um livro específico
export async function updateBookShelf(bookId, shelf) {
  const requestInit = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shelf }),
  };

  try {
    console.log(
      `Atualizando a estante do livro ${bookId} para a categoria ${shelf}...`
    );
    const response = await fetch(`${BASE_URL}/books/${bookId}`, requestInit);

    if (!response.ok) {
      const errorDetails = await response.json();
      throw new Error(
        `Erro ${response.status}: Não foi possível atualizar a estante - ${
          errorDetails.message || ""
        }`
      );
    }

    console.log("Estante atualizada com sucesso para o livro:", bookId);
  } catch (error) {
    console.error("Erro ao atualizar a estante:", error);
    throw error;
  }
}

