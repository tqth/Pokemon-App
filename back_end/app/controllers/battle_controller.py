from fastapi import APIRouter, HTTPException, status
from app.models.battle_schema import BattleRequest
from app.services import battle_service
import requests

router = APIRouter()

@router.post("/")
def battle(request: BattleRequest):
    try:
        result = battle_service.fight(request.pokemon1, request.pokemon2)
        return result
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                            detail="PokéAPI unavailable")
    except KeyError as e:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail=f"Pokémon not found: {e}")
