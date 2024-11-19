import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import Book from "../components/Book";

function SearchPage({ setBooks }) {
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleShelfChange = (book, newShelf) => {
    setBooks((prevBooks) =>
      prevBooks.map((b) => (b.id === book.id ? { ...b, shelf: newShelf } : b))
    );
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <SearchBar
          setSearchResults={setSearchResults}
          setHasSearched={setHasSearched}
        />
      </div>
      <div className="books-grid">
        {hasSearched && searchResults.length === 0 ? (
          <p>Nenhum resultado encontrado</p>
        ) : (
          searchResults.map((book) => (
            <Book key={book.id} book={book} onShelfChange={handleShelfChange} />
          ))
        )}
      </div>
    </div>
  );
}

export default SearchPage;

