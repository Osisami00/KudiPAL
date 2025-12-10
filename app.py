# app.py

import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig
)
from datetime import datetime

# ----------------------------------------------------------------
# MODEL SETTINGS
# ----------------------------------------------------------------

model_id = "NCAIR1/N-ATLaS"

# 4-bit quantization (required for Lightning GPU < 40GB)
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.bfloat16,
    bnb_4bit_use_double_quant=True
)

# Use the GPU Lightning gives OR fallback to CPU
device = "cuda" if torch.cuda.is_available() else "cpu"

# ----------------------------------------------------------------
# LOAD TOKENIZER + MODEL
# ----------------------------------------------------------------

print("🔄 Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(model_id)

print("🔄 Loading model in 4-bit quantization...")
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",     # Lightning-safe
)

model.eval()
print("✅ Model loaded successfully.")


# ----------------------------------------------------------------
# LLM INFERENCE FUNCTIONS
# ----------------------------------------------------------------

def _format_text(messages):
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

    text = _format_text(messages)
    inputs = tokenizer(text, return_tensors="pt", add_special_tokens=False).to(model.device)

    with torch.no_grad():
        outputs = model.generate(
            **inputs,
            max_new_tokens=400,
            temperature=0.2,
            repetition_penalty=1.1
        )

    return tokenizer.decode(outputs[0], skip_special_tokens=True)


# ----------------------------------------------------------------
# API METHODS
# ----------------------------------------------------------------

async def summarize_text(text, lang):
    prompt = f"Summarize this text in {lang}: {text}"
    return ask_llm(prompt, "You summarize clearly.")


async def investment_suggestion(amount, lang):
    prompt = f"""
User wants to invest ₦{amount}.
Suggest Nigerian investment platforms.
Include:
- 6-month expected returns
- Risk level
- Real links
Explain in {lang}.
"""
    return ask_llm(prompt, "You are a Nigerian investment expert.")


async def loan_suggestion(amount, months, lang):
    prompt = f"""
Loan needed: ₦{amount} payable in {months} months.
Provide:
- Cheapest loan providers
- Interest comparison
- Approval speed
- Links
Explain in {lang}.
"""
    return ask_llm(prompt, "You are a Nigerian loan comparison expert.")


async def side_hustle_recommendation(skills, urgency, lang):
    prompt = f"""
Skills: {skills}
Urgency: {urgency}

Provide:
- 5 fast-paying side hustles in Nigeria
- Earnings estimate
- How to start today
- Tools needed
- Real websites
Explain in {lang}.

Answer the question clearly in the format

provide website link for the mentioned side hustles

My sugestion:...


"""
    response=ask_llm(prompt, "You are a Nigerian job and hustle expert.")
    if "My sugestion" in response:
        response= response.split("My sugestion:...")[-1].strip()
    elif "MY SUGESTION" in response:
        response= response.split("My sugestion:...")[-1].strip()
    elif "my sugestion" in response:
        response= response.split("My sugestion:...")[-1].strip()
    return response
