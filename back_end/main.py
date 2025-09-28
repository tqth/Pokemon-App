from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.controllers import pokemon_controller, battle_controller

app = FastAPI(title="Pokemon Fighting API")

# CORS cho frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(pokemon_controller.router, prefix="/pokemon", tags=["Pokemon"])
app.include_router(battle_controller.router, prefix="/battle", tags=["Battle"])
