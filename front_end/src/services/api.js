import axios from "axios";

const API_BASE = "http://localhost:8000"; // Backend FastAPI

// Lấy danh sách Pokémon
export const getPokemonList = async () => {
  try {
    const res = await axios.get(`${API_BASE}/pokemon?limit=18`);
    // Đảm bảo trả về mảng
    return res.data.results || [];
  } catch (err) {
    console.error("Error fetching pokemon list:", err);
    return [];
  }
};

// Lấy chi tiết 1 Pokémon
export const getPokemonDetail = async (name) => {
  try {
    const res = await axios.get(`${API_BASE}/pokemon/${name}`);
    return res.data;
  } catch (err) {
    console.error("Error fetching pokemon detail:", err);
    return null;
  }
};

// Fight 2 Pokémon
export const battlePokemon = async (p1, p2) => {
  try {
    const res = await axios.post(`${API_BASE}/battle`, {
      pokemon1: p1,
      pokemon2: p2,
    });
    return res.data;
  } catch (err) {
    console.error("Error battling pokemon:", err);
    return null;
  }
};

