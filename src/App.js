import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import Filters from "./components/Filters";
import CharacterDetails from "./components/CharacterDetails";
import "./App.css";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacters();
  }, []);

  const fetchCharacters = async () => {
    setLoading(true);
    try {
      const responses = await Promise.all(
        Array.from({ length: 5 }, (_, i) =>
          fetch(`https://rickandmortyapi.com/api/character?page=${i + 1}`)
        )
      );
      const data = await Promise.all(responses.map((res) => res.json()));
      const combinedResults = data.flatMap((d) => d.results);
      setCharacters(combinedResults);
      setFilteredCharacters(combinedResults);
      setLoading(false);
    } catch (err) {
      setError("Veriler alınırken bir hata oluştu.");
      setLoading(false);
    }
  };

  const handleFilter = (filters) => {
    let results = characters;

    if (filters.name) {
      results = results.filter((char) =>
        char.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters.status) {
      results = results.filter((char) => char.status === filters.status);
    }

    if (filters.gender) {
      results = results.filter((char) => char.gender === filters.gender);
    }

    setFilteredCharacters(results);
  };

  return (
    <div className="App">
      <h1>Rick and Morty Karakter Tablosu</h1>
      {loading && <p>Yükleniyor...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <>
          <Filters onFilter={handleFilter} />
          <Table
            characters={filteredCharacters}
            onCharacterSelect={setSelectedCharacter}
          />
          {filteredCharacters.length === 0 && (
            <strong>Filtreleme sonucunda hiçbir karakter bulunamadı.</strong>
          )}
          {selectedCharacter && (
            <CharacterDetails character={selectedCharacter} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
