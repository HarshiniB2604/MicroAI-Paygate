# agent-knowledge.md

## Project Context

You are working inside the MicroAI Paygate codebase.

Your goal is to support x402-powered API endpoints that require micropayments in USDC per call. These APIs return `HTTP 402 Payment Required` unless a valid payment header is included.

The main AI service is Gemini-based summarization.

## What the Agent Should Know

- Endpoints (e.g. `/summarize`) require a signed payment payload before returning AI responses.
- Payment flow is enforced using the x402 protocol (custom headers, signed payloads, nonce).
- Signatures are validated server-side and forwarded via facilitator or local settlement.
- You may be asked to update endpoint logic, signature validation, or build more agent automation.

## Environment Assumptions

- API backend is built with Node.js + Express using `create-x402`.
- Payments are in USDC on Base or Cronos.
- Gemini API is used for AI inference (via Google’s Gemini Pro endpoint).
- You can assume `.env` contains `GEMINI_API_KEY`, `X402_PRIVATE_KEY`, etc.

## What You Should Help With

- Ensuring that requests follow the x402 payment lifecycle
- Building and verifying agent request automation (sign, send, retry)
- Fixing backend payment enforcement or OpenAI/Gemini response handling
- Enhancing API contract documentation (pricing, input/output, status codes)
- Creating and maintaining logic for replay safety, error responses, and payment success/failure handling

## Edge Cases You Must Handle

- Replayed payment nonce
- Malformed or expired signatures
- AI service failure or timeout
- Payment submitted but request dropped
- Large input → price mismatch

## Final Reminder

Do not ask for user credentials or wallet keys. If the user is testing a payment flow, always validate the integrity of the signature and enforce the price/token match.

