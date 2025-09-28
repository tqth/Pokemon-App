from pydantic import BaseModel

class BattleRequest(BaseModel):
    pokemon1: str
    pokemon2: str

class BattleResult(BaseModel):
    winner: str
    detail: dict
