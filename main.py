# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from services import (
    get_summary,
    get_investment_suggestion,
    get_loan_suggestion,
    get_side_hustles
)

app = FastAPI(title="KudiPAL")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Simple language memory
USER_LANG = {}

@app.post("/set-language")
def set_language(user_id: str, lang: str):
    USER_LANG[user_id] = lang
    return {"status": "ok", "language": lang}

def get_lang(user_id: str):
    return USER_LANG.get(user_id, "English")

@app.post("/summary")
async def summary(user_id: str, data: dict):
    return await get_summary(data, get_lang(user_id))

@app.get("/invest")
async def invest(user_id: str, amount: int):
    return await get_investment_suggestion(amount, get_lang(user_id))

@app.get("/loan")
async def loan(user_id: str, amount: int, months: int):
    return await get_loan_suggestion(amount, months, get_lang(user_id))

@app.get("/side-hustle")
async def hustle(user_id: str, skills: str, urgency: str):
    return await get_side_hustles(skills, urgency, get_lang(user_id))

@app.get("/health")
def health():
    return {"status": "running"}

