import React from "react";

function Book({ book, onShelfChange }) {
  const handleChange = (event) => {
    onShelfChange(book, event.target.value);
  };

  return (
    <div className="book">
      <div
        className="book-cover"
        style={{
          backgroundImage: `url(${book.imageLinks?.thumbnail})`,
        }}
      ></div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors?.join(", ")}</div>
      <select value={book.shelf} onChange={handleChange}>
        <option value="move" disabled>
          Mover para...
        </option>
        <option value="currentlyReading">Estou lendo</option>
        <option value="wantToRead">Quero ler</option>
        <option value="read">Já lido</option>
        <option value="none">Remover</option>
      </select>
    </div>
  );
}

export default Book;

