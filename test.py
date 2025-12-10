# from fastapi import FastAPI
# from pydantic import BaseModel
# from transformers import AutoTokenizer
# from datetime import datetime
# # from awari_client import model
# from dotenv import load_dotenv
# import os
# load_dotenv()

# from pyngrok import ngrok

# n_key = os.getenv("ngrok_auth")

# from huggingface_hub import login


# from fastapi.middleware.cors import CORSMiddleware

# # Initialize ngrok
# if n_key:
#     ngrok.set_auth_token(n_key)
# else:
#     print("No ngrok auth token found in environment variables")
#     print("Add 'auth_token=YOUR_NGROK_TOKEN' to your .env file")


# ngrok.set_auth_token(n_key)

# app = FastAPI()

# model_id = "NCAIR1/N-ATLaS"
# tokenizer = AutoTokenizer.from_pretrained(model_id)


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


# def format_text_for_inference(messages):
#     current_date = datetime.now().strftime('%d %b %Y')
#     text = tokenizer.apply_chat_template(
#         messages,
#         add_generation_prompt=True,
#         tokenize=False,
#         date_string=current_date
#     )
#     return text

# def get_response(user_prompt):
#     q_chat = [
#         {'role': 'system',
#          'content': 'you are a large language model trained by Awarri AI technologies. You are a friendly assistant and you are here to help.'},
#         {'role': 'user', 'content': f"{user_prompt}"}
#     ]

#     text = format_text_for_inference(q_chat)
#     input_tokens = tokenizer(text, return_tensors='pt', add_special_tokens=False).to('cuda')

#     outputs = model.generate(
#         **input_tokens,
#         max_new_tokens=1000,
#         use_cache=True,
#         repetition_penalty=1.12,
#         temperature=0.1
#     )

#     text = tokenizer.batch_decode(outputs)[0]
#     return text


# # ----------------------------
# # FastAPI Endpoints
# # ----------------------------

# class ChatRequest(BaseModel):
#     prompt: str


# @app.get("/health")
# def home():
#     return {"message": "N-ATLAS FastAPI is running successfully!"}


# @app.post("/chat")
# def chat(req: ChatRequest):
#     response = get_response(req.prompt)
#     return {"response": response}

# public_url=ngrok.connect(8000)


# # Start ngrok tunnel (only if we have a token)
# if n_key:
#     try:
#         # Kill any existing ngrok processes first
#         try:
#             ngrok.kill()
#         except:
#             pass
        
#         # Connect to port 8080
#         public_url = ngrok.connect(8080)
#         print(f"Ngrok tunnel created!")
#         print(f"Public URL: {public_url}")
#         print(f"Local URL: http://localhost:8080")
#         print(f" API Docs: {public_url}/docs")
#     except Exception as e:
#         print(f"Failed to create ngrok tunnel: {e}")
#         print("Running locally only at http://localhost:8080")
# else:
#     print("Running locally at http://localhost:8080 (no ngrok)")

from fastapi import FastAPI
from pydantic import BaseModel
from transformers import AutoTokenizer, AutoModelForCausalLM
from datetime import datetime
from dotenv import load_dotenv
import os
from pyngrok import ngrok
import uvicorn

load_dotenv()

n_key = os.getenv("ngrok_auth")

app = FastAPI()

model_id = "NCAIR1/N-ATLaS"
tokenizer = AutoTokenizer.from_pretrained(model_id)
model = AutoModelForCausalLM.from_pretrained(model_id).to("cuda")

# CORS
from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper functions
def format_text_for_inference(messages):
    current_date = datetime.now().strftime('%d %b %Y')
    return tokenizer.apply_chat_template(
        messages,
        add_generation_prompt=True,
        tokenize=False,
        date_string=current_date
    )

def get_response(user_prompt):
    q_chat = [
        {'role': 'system', 'content': 'You are a friendly Awarri AI assistant.'},
        {'role': 'user', 'content': user_prompt}
    ]
    
    text = format_text_for_inference(q_chat)
    input_tokens = tokenizer(text, return_tensors='pt', add_special_tokens=False).to('cuda')

    outputs = model.generate(
        **input_tokens,
        max_new_tokens=1000,
        temperature=0.1
    )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)

# Models
class ChatRequest(BaseModel):
    prompt: str

@app.get("/health")
def health():
    return {"message": "FastAPI + N-ATLAS is running"}

@app.post("/chat")
def chat(req: ChatRequest):
    return {"response": get_response(req.prompt)}

# if __name__ == "__main__":
#     if n_key:
#         ngrok.set_auth_token(n_key)
#         public_url = ngrok.connect(8000)
#         print("Ngrok tunnel:", public_url)
#         print("API Docs:", public_url + "/docs")


