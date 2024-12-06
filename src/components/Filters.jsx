import React, { useState } from "react";

const Filters = ({ onFilter }) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ name, status, gender });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="İsim ile filtrele"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Durum Seç</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Cinsiyet Seç</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>
      <button type="submit">Filtrele</button>
    </form>
  );
};

export default Filters;
