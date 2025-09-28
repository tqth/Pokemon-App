from app.services import pokemon_service
from app.models.battle_schema import BattleResult

def fight(pokemon1: str, pokemon2: str) -> BattleResult:
    p1 = pokemon_service.get_pokemon_detail(pokemon1)
    p2 = pokemon_service.get_pokemon_detail(pokemon2)

    score1 = p1["hp"] + p1["attack"] + p1["defense"]
    score2 = p2["hp"] + p2["attack"] + p2["defense"]

    winner = p1["name"] if score1 >= score2 else p2["name"]

    return {
        "winner": winner,
        "detail": {
            p1["name"]: score1,
            p2["name"]: score2
        }
    }
