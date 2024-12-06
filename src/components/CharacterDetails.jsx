import React from "react";

const CharacterDetails = ({ character }) => {
  return (
    <div>
      <h2>{character.name}</h2>
      <img src={character.image} alt={character.name} />
      <p>Durum: {character.status}</p>
      <p>Cinsiyet: {character.gender}</p>
      <p>Tür: {character.species}</p>
    </div>
  );
};

export default CharacterDetails;
