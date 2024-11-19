import React from "react";
import BookShelf from "../components/BookShelf";
import { Link } from "react-router-dom";

function HomePage({ books, setBooks }) {
  return (
    <div>
      <h1>Estante de Livros</h1>
      <BookShelf
        title="Estou lendo"
        books={books.filter((book) => book.shelf === "currentlyReading")}
        setBooks={setBooks}
      />
      <BookShelf
        title="Quero ler"
        books={books.filter((book) => book.shelf === "wantToRead")}
        setBooks={setBooks}
      />
      <BookShelf
        title="Já lido"
        books={books.filter((book) => book.shelf === "read")}
        setBooks={setBooks}
      />
      <Link to="/search">Ir para a pesquisa</Link>
    </div>
  );
}

export default HomePage;
