import React, { useState, useEffect } from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";
import { getAllBooks, updateBookShelf } from "./api/booksAPI";
import BookShelf from "./components/BookShelf";
import SearchPage from "./pages/SearchPage";

function App() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  // Buscar livros da API ou do local ao carregar o app
  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem("books"));
    if (savedBooks) {
      setBooks(savedBooks);
      setIsLoading(false);
    } else {
      getAllBooks()
        .then((fetchedBooks) => {
          setBooks(fetchedBooks);
          localStorage.setItem("books", JSON.stringify(fetchedBooks));
        })
        .catch((error) => console.error("Erro ao buscar livros:", error))
        .finally(() => setIsLoading(false));
    }
  }, []);

  // Atualiza o local sempre que os livros mudarem
  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  // Função para alterar a estante de um livro
  const handleShelfChange = async (book, newShelf) => {
    const updatedBooks = books.map((b) =>
      b.id === book.id ? { ...b, shelf: newShelf } : b
    );
    setBooks(updatedBooks);

    try {
      await updateBookShelf(book.id, newShelf);
    } catch (error) {
      console.error("Erro ao atualizar a estante na API:", error);
    }
  };

  if (isLoading) {
    return <div className="loading">Carregando livros...</div>;
  }

  return (
    <div className="app">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <h1>Estante de Livros</h1>

        {location.pathname === "/" && (
          <Link to="/search" className="search-button">
            Buscar Livros
          </Link>
        )}

        {location.pathname === "/search" && (
          <Link to="/" className="back-link">
            Voltar para a página principal
          </Link>
        )}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <div className="bookshelf-container">
              <BookShelf
                title="Estou lendo"
                books={books.filter(
                  (book) => book.shelf === "currentlyReading"
                )}
                onShelfChange={handleShelfChange}
              />
              <BookShelf
                title="Quero ler"
                books={books.filter((book) => book.shelf === "wantToRead")}
                onShelfChange={handleShelfChange}
              />
              <BookShelf
                title="Já lido"
                books={books.filter((book) => book.shelf === "read")}
                onShelfChange={handleShelfChange}
              />
            </div>
          }
        />
        <Route
          path="/search"
          element={<SearchPage books={books} setBooks={setBooks} />}
        />
      </Routes>
    </div>
  );
}

export default App;

