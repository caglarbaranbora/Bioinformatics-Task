import React, { useState } from "react";

const Table = ({ characters, onCharacterSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentCharacters = characters.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>İsim</th>
            <th>Durum</th>
            <th>Cinsiyet</th>
          </tr>
        </thead>
        <tbody>
          {currentCharacters.map((character) => (
            <tr
              key={character.id}
              onClick={() => onCharacterSelect(character)}
              style={{ cursor: "pointer" }}
            >
              <td>{character.name}</td>
              <td>{character.status}</td>
              <td>{character.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {Array.from(
          { length: Math.ceil(characters.length / rowsPerPage) },
          (_, i) => (
            <button key={i} onClick={() => handlePageChange(i + 1)}>
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default Table;
