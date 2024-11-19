import React, { useState, useEffect } from "react";
import { searchBooks } from "../api/booksAPI";

function SearchBar({ setSearchResults, setHasSearched }) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (query.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
        setHasSearched(false);
      }
    }, 300); // Espera de 300ms

    return () => clearTimeout(delayDebounceFn);
  }, [query]); // Dispara o efeito sempre que "query" muda

  const handleSearch = async () => {
    setHasSearched(true);
    try {
      const data = await searchBooks(query);
      console.log("Resultados da busca:", data);

      // Ajusta conforme o formato correto dos dados retornados pela API
      setSearchResults(data.books || data || []);
    } catch (error) {
      console.error("Erro na busca:", error);
      setSearchResults([]);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        type="text"
        className="search-bar"
        placeholder="Digite o nome do livro para buscar..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{ width: "100%", maxWidth: "400px", padding: "10px" }}
      />
    </div>
  );
}

export default SearchBar;
