from pydantic import BaseModel

class Pokemon(BaseModel):
    name: str
    sprite: str
    hp: int
    attack: int
    defense: int
