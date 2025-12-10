# services.py
from llm import ask_llm

async def get_summary(data, lang):
    prompt = f"Summarize this text in {lang}: {data}"
    return ask_llm(prompt, "You summarize clearly.")

async def get_investment_suggestion(amount, lang):
    prompt = f"""
User wants to invest ₦{amount}.
Suggest an investment platform in Nigeria.
Show:
- Expected return in 6 months
- Risk level
- Link to the investment platform
Explain in {lang}.
"""
    return ask_llm(prompt, "You are a Nigerian investment expert.")

async def get_loan_suggestion(amount, months, lang):
    prompt = f"""
User needs a loan of ₦{amount} payable in {months} months.

List:
- Cheapest loan providers in Nigeria
- Interest rate comparison
- Approval speed
- Direct application links

Explain in {lang}.
"""
    return ask_llm(prompt, "You are a loan comparison expert.")

async def get_side_hustles(skills, urgency, lang):
    prompt = f"""
Skills: {skills}
Urgency: {urgency}

Suggest:
- 5 fast side-hustles the user can start NOW in Nigeria
- Daily earning estimate
- Tools needed
- Step-by-step start guide
- Links to real opportunities

Explain in {lang}.
"""
    return ask_llm(prompt, "You are a Nigerian job and hustle expert.")