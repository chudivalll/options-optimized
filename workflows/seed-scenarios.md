# Workflow: Adding a New Scenario

## Purpose
Standard operating procedure for researching, creating, and adding new historical options trading scenarios to Options Optimized.

## Prerequisites
- Access to historical stock price data
- Understanding of options Greeks and pricing
- Familiarity with the scenario JSON schema

## Steps

### 1. Select a Historical Event
Choose a notable market event involving an NYSE-listed American company:
- **Criteria**: Clear catalyst, significant price movement, relevant to options education
- **Categories**: pandemic, earnings, fed, crisis, momentum, sector
- **Avoid**: Events with ambiguous outcomes or insufficient public data

### 2. Research the Event
Gather the following data for the event date:
- Stock price, 30-day price change, market cap
- Sector and SPY performance for context
- 2-4 representative options contracts with realistic Greeks
- IV, HV, IV rank, IV percentile
- 3-4 news headlines from the time period
- Analyst consensus rating and put/call ratio

### 3. Document the Outcome
Record what happened after the event:
- Price movements at 1 week, 1 month, and 3 months
- The actual direction (bullish/bearish/neutral)
- Optimal options strategies in hindsight
- Best timeframe for the trade
- Best single-contract return percentage

### 4. Write the Narratives
- **Setup Narrative** (2-3 paragraphs): Place the reader in the moment. Describe the market conditions, what people were thinking, and what data was available. Use present tense.
- **Reveal Narrative** (2-3 paragraphs): Tell the story of what happened. Include specific price data. Explain why certain strategies worked.

### 5. Create the JSON File
Create a new file at `src/data/scenarios/{slug}.json` following the schema in the plan document. Ensure all JSON is valid and all fields are populated.

### 6. Seed the Database
Run `npm run seed` to reload all data including the new scenario.

### 7. Verify
- Start the dev server: `npm run dev`
- Navigate to /scenarios and confirm the new scenario appears
- Play through the full flow: setup → predict → reveal
- Verify scoring works correctly for the new scenario's outcome data

## Schema Reference
See `src/data/scenarios/covid-airlines.json` for a complete example of the JSON structure.

## Tips
- Keep Greeks values realistic — use an options pricing calculator if needed
- IV should be expressed as a decimal in `greeksData.contracts` (e.g., 0.35 = 35%) but as a whole number in `volatilityData` (e.g., iv30: 35)
- The `bestContractReturn` is a percentage (e.g., 500 means 500% return)
- Difficulty levels: beginner (obvious directional move), intermediate (requires analysis), advanced (complex/counterintuitive)
