# app.py

import torch
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    BitsAndBytesConfig
)
from datetime import datetime


# MODEL SETTINGS


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


# LOAD TOKENIZER + MODEL

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(model_id)

print("Loading model in 4-bit quantization...")
model = AutoModelForCausalLM.from_pretrained(
    model_id,
    quantization_config=bnb_config,
    device_map="auto",     # Lightning-safe
)

model.eval()
print("Model loaded successfully.")



# LLM INFERENCE FUNCTIONS

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



# API METHODS

async def summarize_text(text, lang):
    prompt = f"Summarize this text in {lang}: {text}"
    return ask_llm(prompt, "You summarize clearly.")


# async def investment_suggestion(amount, lang):
#     prompt = f"""
# User wants to invest ₦{amount}.

# Below are VERIFIED Nigerian investment platforms. 
# You MUST evaluate ONLY these two platforms and choose ONE final recommendation:

# Platforms:
# 1. Cowrywise - https://cowrywise.com
# 2. Bamboo - https://investbamboo.com

# For each platform, briefly state:
# - Estimated 6-month return range (percentage)
# - Risk level (Low / Medium / High)
# - One clear reason why the platform performs well

# Then:
# Select ONLY ONE platform as your FINAL recommendation  
# Explain clearly why it is the best choice for this user's amount  
# Do NOT recommend more than one platform

# Rules:
# - Use only the listed platforms
# - Output must be concise, structured, and realistic
# - This is informational, not financial advice

# Explain in {lang}.

# My suggestion:
# """
#     response = ask_llm(prompt, "You are a Nigerian investment expert.")
    
#     # Optional: remove any unnecessary assistant header
#     if "My suggestion" in response:
#         response = response.split("My suggestion")[-1].strip()
    
#     return response

async def investment_suggestion(lang):
    prompt = f"""
    You are a Nigerian investment expert.

Evaluate ONLY these two platforms:
1. Cowrywise - https://cowrywise.com
2. Bamboo - https://investbamboo.com
3. Risevest - https://risevest.com
4. PiggyVest (Invest section) - https://piggyvest.com/invest
5. Chaka - https://chaka.com

Select ONLY ONE platform as the final recommendation for a user investing ₦200,000.  
Output ONLY ONE sentence in this exact format:

"If you invest 200000 in <platform>, in 6 months you will have <estimated return>."
The estimated return should not be in percent. Just the total amount alone.
Do NOT write anything else. No lists, no comparisons, no extra sentences.  
Explain in {lang}.
    """

    response = ask_llm(prompt, "You are a Nigerian investment expert.")  # no await

    # Extract the assistant sentence
    lines = response.split("\n")
    assistant_line = [line for line in lines if line.lower().startswith("if you invest")]
    final_output = assistant_line[0].strip() if assistant_line else ""
    return final_output






# async def loan_suggestion(amount, months, lang):
#     prompt = f"""
# Loan needed: ₦{amount}, repayable over {months} months.

# Below are VERIFIED Nigerian loan providers.
# You MUST evaluate ONLY these providers and choose ONE final recommendation.

# Loan Providers:
# 1. Carbon - https://getcarbon.co
# 2. FairMoney - https://fairmoney.ng
# 3. Renmoney - https://renmoney.com
# 4. Aella Credit - https://aellaapp.com
# 5. Branch - https://branch.co/ng

# For EACH provider, briefly state:
# - Typical interest rate range
# - Repayment flexibility
# - Approval speed (Instant / Same day / 24-48 hrs)
# - One strength of the provider

# Then:
# Select ONLY ONE provider as your FINAL recommendation  
# Explain clearly why it is the cheapest and most suitable for this loan amount and duration  
# Do NOT recommend more than one provider

# Rules:
# - Use only the listed providers
# - Be realistic and conservative with rates
# - Output must be concise and well-structured
# - This is informational, not financial advice

# Explain in {lang}.

# My sugestion:...
# """
#     response =  ask_llm(prompt, "You are a Nigerian loan comparison expert.")
#     if "My sugestion" in response:
#         response= response.split("My sugestion:...")[-1].strip()
#     elif "MY SUGESTION" in response:
#         response= response.split("My sugestion:...")[-1].strip()
#     elif "my sugestion" in response:
#         response= response.split("My sugestion:...")[-1].strip()
#     return response


async def loan_suggestion(lang):
    prompt = f"""

Below are VERIFIED Nigerian loan providers.
Evaluate ONLY these providers and choose ONE final recommendation:

Loan Providers:
1. Carbon - https://getcarbon.co
2. FairMoney - https://fairmoney.ng
3. Renmoney - https://renmoney.com
4. Aella Credit - https://aellaapp.com
5. Branch - https://branch.co/ng

Yo can choose any amount of your choice
Select ONLY ONE provider as the final recommendation.
Output ONLY ONE sentence in this exact format:

"If you take a ₦<amount> loan from <provider> over <months> months, you will pay approximately <total repayment> in six months."

Do NOT write anything else. No lists, no comparisons, no extra sentences.  
Explain in {lang}.
"""
    response = ask_llm(prompt, "You are a Nigerian loan comparison expert.")

    # Extract the assistant's sentence
    lines = response.split("\n")
    assistant_line = [line for line in lines if line.lower().startswith("if you take")]
    final_output = assistant_line[0].strip() if assistant_line else ""
    return final_output



# async def side_hustle_recommendation(skills, urgency, lang):
#     prompt = f"""
# Skills: {skills}
# Urgency: {urgency}

# Below are VERIFIED platforms commonly used in Nigeria for quick-paying side hustles.
# You MUST use ONLY these platforms when suggesting side hustles.

# Platforms:
# 1. Upwork - https://www.upwork.com
# 2. Fiverr - https://www.fiverr.com
# 3. Toptal - https://www.toptal.com
# 4. Jiji Services - https://jiji.ng/services
# 5. Indeed Nigeria - https://ng.indeed.com
# 6. Facebook Marketplace - https://www.facebook.com/marketplace
# 7. WhatsApp Business - https://www.whatsapp.com/business

# Task:
# - Suggest EXACTLY 5 fast-paying side hustles suitable for the user's skills and urgency
# - Each side hustle MUST be linked to ONE of the platforms above

# For EACH side hustle, provide:
# 1. Side hustle name
# 2. Expected earnings (daily or weekly estimate)
# 3. ONE real website link (from the platforms list)

# Then:
# Select ONE side hustle as your FINAL recommendation  
# Explain why it is the fastest way for this user to earn money right now

# Rules:
# - Use only the listed platform
# - provide and Recommend ONLY one side hustle at a time
# - Be practical and realistic for Nigeria
# - Explain in {lang}.

# provide website link for the mentioned side hustles

# My sugestion:...

# """
#     response=ask_llm(prompt, "You are a Nigerian job and hustle expert.")
#     if "My sugestion" in response:
#         response= response.split("My sugestion:...")[-1].strip()
#     elif "MY SUGESTION" in response:
#         response= response.split("My sugestion:...")[-1].strip()
#     elif "my sugestion" in response:
#         response= response.split("My sugestion:...")[-1].strip()
#     return response



async def side_hustle_recommendation(skills, urgency, lang="English"):
    prompt = f"""
Skills: {skills}
Urgency: {urgency}

Below are VERIFIED platforms commonly used in Nigeria for quick-paying side hustles.
Use ONLY these platforms:

1. Upwork - https://www.upwork.com
2. Fiverr - https://www.fiverr.com
3. Toptal - https://www.toptal.com
4. Jiji Services - https://jiji.ng/services
5. Indeed Nigeria - https://ng.indeed.com
6. Facebook Marketplace - https://www.facebook.com/marketplace
7. WhatsApp Business - https://www.whatsapp.com/business

Suggest EXACTLY three fast-paying side hustles suitable for the user's skills and urgency.
Each side hustle MUST be linked to ONE of the platforms above.
Output EACH suggestion in this format (one per line):

"YOU CAN APPLY FOR A <SIDE HUSTLE NAME> SIDE HUSTLE ON <PLATFORM LINK>"

Do NOT write extra explanations or paragraphs. Only the three lines.  
Explain in {lang}.
"""

    response = ask_llm(prompt, "You are a Nigerian job and hustle expert.")

    # Extract lines starting with "YOU CAN APPLY"
    lines = response.split("\n")
    hustle_lines = [line.strip() for line in lines if line.upper().startswith("YOU CAN APPLY")]

    # Return only the three lines
    return "\n".join(hustle_lines[:3])




# async def weekly_expense_report(expenses: dict, income: int, lang: str):
#     expense_lines = "\n".join(
#         [f"- {k}: ₦{v}" for k, v in expenses.items()]
#     )

# # async def weekly_expense_report(expenses, income, lang):
#     prompt = f"""
# User weekly income: ₦{income}

# User weekly expenses (category : amount):
# {expense_lines}

# Task:
# Analyze the user's weekly spending behavior and financial health.

# Provide the following sections clearly:

# 1. Spending Breakdown
# - Identify major spending categories
# - Highlight the top 3 expense drivers

# 2. Spending Health Analysis
# - Is the user overspending or balanced?
# - Identify wasteful or non-essential expenses
# - Detect any risky financial habits

# 3. Optimization Opportunities
# - Specific expenses that can be reduced
# - Safer weekly spending limits per category
# - Smart alternatives (cheaper options, batching, cutting frequency)

# 4. Savings & Growth Advice
# - How much the user can realistically save weekly
# - What to do with the saved amount (emergency fund, investment, bills)

# Then:
# My suggestion:
# Give ONE clear, practical weekly action plan the user should follow immediately to improve their finances.

# Rules:
# - Be realistic and empathetic
# - Use Nigerian cost-of-living context
# - Avoid shaming language
# - Provide actionable, wise advice
# - This is informational, not financial advice

# Explain in {lang}.
# """
#     response = ask_llm(
#         prompt,
#         "You are a seasoned Nigerian financial advisor focused on practical money wisdom."
#     )

#     if "My suggestion:" in response:
#         response = response.split("My suggestion:")[-1].strip()
#     elif "MY SUGGESTION" in response:
#         response = response.split("MY SUGGESTION")[-1].strip()
#     elif "my suggestion" in response:
#         response = response.split("my suggestion")[-1].strip()

#     return response

async def weekly_expense_report(expenses: dict, income: int, lang: str):
    expense_lines = "\n".join(
        [f"- {k}: ₦{v}" for k, v in expenses.items()]
    )

    prompt = f"""
User weekly income: ₦{income}

User weekly expenses (category : amount):
{expense_lines}

Analyze the user's weekly spending behavior and financial health internally.

Then output ONLY ONE sentence in this exact format:

"My weekly money action: <clear practical action the user should take this week>."

Rules:
- ONE sentence only
- No analysis, no breakdown, no explanations
- Practical and realistic for Nigeria
- Friendly and supportive tone
- This is informational, not financial advice

Explain in {lang}.
"""

    response = ask_llm(
        prompt,
        "You are a seasoned Nigerian financial advisor focused on practical money wisdom."
    )

    # Extract only the action sentence
    lines = response.split("\n")
    action_line = [
        line.strip()
        for line in lines
        if line.lower().startswith("my weekly money action")
    ]

    return action_line[0] if action_line else ""




# In-memory chat memory (simple + effective)
CHAT_MEMORY = {}

async def financial_chatbot(user_id: str, message: str, lang: str):
    """
    A conversational financial assistant with memory
    """

    if user_id not in CHAT_MEMORY:
        CHAT_MEMORY[user_id] = []

    # Keep last 6 messages only (cost + focus)
    CHAT_MEMORY[user_id] = CHAT_MEMORY[user_id][-6:]

    system_prompt = f"""
You are KudiPAL, a smart Nigerian financial assistant.

Your role:
- Help users make better money decisions
- Be practical, realistic, and Nigeria-aware
- Give examples in naira (₦)
- Avoid jargon
- Be concise but helpful

You can help with:
- Budgeting
- Saving money
- Managing expenses
- Investment explanations (not hype)
- Loan decisions
- Side hustles
- Financial habits

Rules:
- Do NOT give legal or guaranteed financial promises
- Be conservative and realistic
- Speak in {lang}
"""

    # Build conversation
    conversation = ""
    for msg in CHAT_MEMORY[user_id]:
        conversation += f"{msg['role'].upper()}: {msg['content']}\n"

    prompt = f"""
Conversation so far:
{conversation}

USER: {message}

Respond as a helpful financial assistant.
"""

    response = ask_llm(prompt, system_prompt)

    # Save memory
    CHAT_MEMORY[user_id].append({"role": "user", "content": message})
    CHAT_MEMORY[user_id].append({"role": "assistant", "content": response})

    return {"reply": response}
