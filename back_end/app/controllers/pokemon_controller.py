from fastapi import APIRouter, HTTPException, status
from app.services import pokemon_service
import requests

router = APIRouter()

@router.get("/")
def get_pokemon_list(limit: int = 50, offset: int = 0):
    try:
        data = pokemon_service.get_pokemon_list(limit, offset)
        return data
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                            detail="PokéAPI unavailable")

@router.get("/{name}")
def get_pokemon_detail(name: str):
    try:
        return pokemon_service.get_pokemon_detail(name)
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                            detail="PokéAPI unavailable")
    except KeyError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pokémon '{name}' not found")
