# main.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app import summarize_text, investment_suggestion, loan_suggestion, side_hustle_recommendation


import uvicorn
from pyngrok import ngrok
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="KudiPAL")

# ------------------------------------
# CORS
# ------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------------------------
# IN-MEMORY LANGUAGE STORE
# ------------------------------------
USER_LANG = {}

def get_lang(user_id):
    return USER_LANG.get(user_id, "English")


@app.post("/set-language")
def set_language(user_id: str, lang: str):
    USER_LANG[user_id] = lang
    return {"status": "ok", "language": lang}


# ------------------------------------
# ROUTES
# ------------------------------------

@app.post("/summary")
async def summary(user_id: str, data: dict):
    return await summarize_text(data, get_lang(user_id))


@app.get("/invest")
async def invest(user_id: str, amount: int):
    return await investment_suggestion(amount, get_lang(user_id))


@app.get("/loan")
async def loan(user_id: str, amount: int, months: int):
    return await loan_suggestion(amount, months, get_lang(user_id))


@app.get("/side-hustle")
async def side_hustle(user_id: str, skills: str, urgency: str):
    return await side_hustle_recommendation(skills, urgency, get_lang(user_id))


@app.get("/health")
def health():
    return {"status": "running"}


# ------------------------------------
# NGROK AUTO URL
# ------------------------------------

ngrok_token = os.getenv("ngrok_auth")
ngrok.set_auth_token(ngrok_token)

public_url = ngrok.connect(8000)
print("🚀 Public URL:", public_url)


# ------------------------------------
# RUN SERVER
# ------------------------------------
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
