import React from "react";
import Book from "./Book";

function BookShelf({ title, books, onShelfChange }) {
  return (
    <div className="bookshelf">
      <h2>{title}</h2>
      <div className="books-grid">
        {books.map((book) => (
          <Book key={book.id} book={book} onShelfChange={onShelfChange} />
        ))}
      </div>
    </div>
  );
}

export default BookShelf;

