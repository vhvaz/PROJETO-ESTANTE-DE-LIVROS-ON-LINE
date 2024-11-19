import React from "react";
import { updateBookShelf } from "../api/booksAPI";

function ShelfSelector({ book, books, setBooks }) {
  const handleChange = async (event) => {
    const newShelf = event.target.value;
    console.log("Alterando estante para:", newShelf);

    try {
      await updateBookShelf(book.id, newShelf);
      const updatedBooks = books.map((b) =>
        b.id === book.id ? { ...b, shelf: newShelf } : b
      );
      setBooks(updatedBooks);
    } catch (error) {
      console.error("Erro ao mudar a estante:", error);
    }
  };

  return (
    <select value={book.shelf || "none"} onChange={handleChange}>
      <option value="none" disabled>
        Mover para...
      </option>
      <option value="currentlyReading">Estou lendo</option>
      <option value="wantToRead">Quero ler</option>
      <option value="read">Já lido</option>
    </select>
  );
}

export default ShelfSelector;
