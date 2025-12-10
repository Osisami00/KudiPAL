# llm.py
from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer
from datetime import datetime
# from awari_client import model
from dotenv import load_dotenv
import os
load_dotenv()

from pyngrok import ngrok

n_key = os.getenv("ngrok_auth")

from huggingface_hub import login


from fastapi.middleware.cors import CORSMiddleware

ngrok.set_auth_token(n_key)

app = FastAPI()


model_id = "NCAIR1/N-ATLaS"
tokenizer = AutoTokenizer.from_pretrained(model_id)


def format_text(messages):
    current_date = datetime.now().strftime('%d %b %Y')
    return tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=False,
        date_string=current_date
    )


def ask_llm(prompt: str, system_instruction: str):
    messages = [
        {"role": "system", "content": system_instruction},
        {"role": "user", "content": prompt},
    ]

    text = format_text(messages)
    inputs = tokenizer(text, return_tensors="pt", add_special_tokens=False).to("cuda")

    outputs = model.generate(
        **inputs,
        max_new_tokens=800,
        temperature=0.12,
        repetition_penalty=1.1
    )

    return tokenizer.decode(outputs[0])

public_url=ngrok.connect(8000)