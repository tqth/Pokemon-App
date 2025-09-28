import React, { useEffect, useState } from "react";
import { getPokemonList, getPokemonDetail, battlePokemon } from "../services/api";
import PokemonCard from "../components/PokemonCard";

const PokemonList = () => {
    const [pokemons, setPokemons] = useState([]);
    const [selected, setSelected] = useState([]);
    const [battleResult, setBattleResult] = useState(null);

    // Gọi API lấy danh sách + chi tiết
    useEffect(() => {
        const fetchData = async () => {
            const list = await getPokemonList();
            if (!list.length) return;

            const details = await Promise.all(
                list
                    .filter((p) => p && p.name) // tránh undefined
                    .map(async (p) => await getPokemonDetail(p.name))
            );

            setPokemons(details.filter(Boolean)); // loại bỏ null
        };
        fetchData();
    }, []);

    // Xử lý chọn card
    const handleSelect = (pokemon) => {
        if (selected.find((p) => p.name === pokemon.name)) {
            setSelected(selected.filter((p) => p.name !== pokemon.name));
        } else if (selected.length < 2) {
            setSelected([...selected, pokemon]);
        }
    };

    // Nút Fight
    const handleFight = async () => {
        if (selected.length === 2) {
            const result = await battlePokemon(selected[0].name, selected[1].name);
            setBattleResult(result);
        }
    };


    return (
        <div>
            <h1 style={{ textAlign: "center" }}>Pokémon Battle</h1>
            <h3 style={{ textAlign: "center" }}>Click để chọn Pokémon</h3>
            
            <div style={{ textAlign: "center", marginBottom: "10px", color: "#555" }}>
                {selected.length === 0 && <p>👉 Chọn 2 Pokémon để bắt đầu trận đấu!</p>}
                {selected.length === 1 && <p>👉 Chọn thêm 1 Pokémon nữa để Fight!</p>}
                {selected.length === 2 && <p>✅ Đã chọn đủ 2 Pokémon, nhấn nút Fight!</p>}
            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                {pokemons.map(
                    (p) =>
                        p && (
                            <PokemonCard
                                key={p.name}
                                pokemon={p}
                                onSelect={handleSelect}
                                isSelected={!!selected.find((s) => s.name === p.name)}
                            />
                        )
                )}
            </div>

            {selected.length === 2 && (
                <div style={{ textAlign: "center", margin: "20px" }}>
                    <button
                        onClick={handleFight}
                        style={{
                            padding: "10px 20px",
                            fontSize: "16px",
                            fontWeight: "bold",
                            borderRadius: "8px",
                            backgroundColor: "red",
                            color: "white",
                            cursor: "pointer",
                        }}
                    >
                        Fight!
                    </button>
                </div>
            )}

            {battleResult && (
                <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <h2>
                        Winner: <span style={{ color: "green" }}>{battleResult.winner}</span>
                    </h2>
                    <h3>Scores:</h3>
                    <ul style={{ listStyle: "none", padding: 0 }}>
                        {Object.entries(battleResult.detail).map(([name, score]) => (
                            <li key={name}>
                                {name}: <strong>{score}</strong>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

        </div>
    );
};

export default PokemonList;
