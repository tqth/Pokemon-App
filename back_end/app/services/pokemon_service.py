import requests
from app.config.setting import POKEAPI_BASE_URL

def get_pokemon_list(limit=50, offset=0):
    url = f"{POKEAPI_BASE_URL}/pokemon?limit={limit}&offset={offset}"
    response = requests.get(url)
    return response.json()

def get_pokemon_detail(name: str):
    url = f"{POKEAPI_BASE_URL}/pokemon/{name}"
    response = requests.get(url).json()
    return {
        "name": response["name"],
        "sprite": response["sprites"]["front_default"],
        "hp": response["stats"][0]["base_stat"],
        "attack": response["stats"][1]["base_stat"],
        "defense": response["stats"][2]["base_stat"],
    }
