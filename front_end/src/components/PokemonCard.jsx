import React from "react";

const PokemonCard = ({ pokemon, onSelect, isSelected }) => {
  if (!pokemon) return null; // tránh lỗi undefined

  return (
    <div
      onClick={() => onSelect(pokemon)}
      style={{
        border: isSelected ? "3px solid red" : "1px solid #ddd",
        borderRadius: "8px",
        padding: "10px",
        textAlign: "center",
        width: "150px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        cursor: "pointer",
        backgroundColor: isSelected ? "#ffe5e5" : "white",
      }}
    >
      <img
        src={pokemon.sprite}
        alt={pokemon.name}
        style={{ width: "100px", height: "100px" }}
      />
      <h3 style={{ textTransform: "capitalize" }}>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;
