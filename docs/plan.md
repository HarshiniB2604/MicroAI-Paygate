# plan.md

## Project Name: MicroAI Paygate

## Description

MicroAI Paygate is a crypto-native, decentralized API monetization layer that enables developers to expose AI-powered services on the open internet with enforced per-request payments via the x402 protocol. Instead of relying on API keys, OAuth, or subscription systems, MicroAI Paygate uses HTTP 402 responses and cryptographic payment headers to create a seamless, programmable, and autonomous way to pay for and access services. It is designed to be compatible with human users and autonomous agents.

The project is focused on delivering a production-grade demonstration of a simple, transparent, and scalable way to commercialize AI APIs using Web3 tools. 

## Problem Statement

Traditional AI APIs rely on centralized access controls such as:
- API keys issued via accounts
- Monthly billing or credit quotas
- Manual provisioning and rate limiting
- Poor interoperability with autonomous clients (e.g., agents or bots)

These limitations create friction for:
- Developers who want to monetize lightweight services without deploying full SaaS stacks
- Agents or bots that want to consume services without registering, subscribing, or negotiating access
- Open ecosystems where pay-per-use should be the default interaction model

## What This Project Solves

MicroAI Paygate addresses:
- The inability to monetize APIs without centralized infrastructure
- The friction of integrating traditional authentication and billing models
- The lack of payment-native APIs for agent-based applications
- The absence of standard micropayment enforcement tools in public APIs

It allows:
- Any service provider to expose an AI endpoint with pricing
- Any client (user, script, or agent) to interact with that endpoint using a pay-per-call model
- Enforcement of payment through x402-compliant 402/200 HTTP flows and cryptographic verification
- Instant, auditable crypto payments via stablecoins on-chain or through a facilitator relay

## Core Mechanism

1. A user or agent sends a request to a protected API endpoint.
2. The server returns `HTTP 402 Payment Required` and includes:
   - The price of the call
   - Token type (e.g., USDC)
   - Recipient address
   - A nonce (to prevent replay)
   - A facilitator endpoint (optional)
3. The client signs the payment metadata using their wallet private key and attaches the signed payload to the original request.
4. The server verifies the signature, ensures it matches the expected metadata, and either:
   - Sends the transaction via a facilitator (gasless)
   - Confirms the on-chain payment (local mode)
5. If valid, the server processes the request and returns the result.

## Primary User Journeys

### For AI Service Providers:
- Define a new endpoint (e.g., /summarize)
- Set a fixed price and accepted token (e.g., 0.01 USDC)
- Deploy using the x402 middleware
- Collect payments on-chain automatically, per request

### For Human Users or Developers:
- Discover the endpoint and pricing
- Use Postman, browser extension, or CLI to sign and send requests
- Only pay for what you use — no setup or accounts required

### For Autonomous Agents:
- Interact with the API using an agent wallet
- Automatically parse 402 responses, sign and send payments
- Integrate responses into agent workflows (e.g., summarizing content, analyzing sentiment, etc.)

## Service Components

### API Endpoints
- /summarize – Accepts plain text, returns OpenAI-generated summary
- /sentiment – Accepts text, returns sentiment classification
- Expandable to additional models and tools

### x402 Middleware
- Adds HTTP 402 enforcement layer to any Express.js endpoint
- Manages nonce issuance, pricing metadata, and signature verification

### Facilitator Mode
- Optional off-chain relayer that accepts signed payment requests and submits on-chain transactions on behalf of the user
- Simplifies UX for users without direct gas

### Agent Client (Demo)
- A script that performs the full x402 flow:
  - Sends request
  - Parses 402 response
  - Signs metadata
  - Sends retry with payment
  - Displays final result

## Architecture Summary

- Backend: Node.js with Express, using `create-x402` to scaffold service
- AI Layer: Gemini API (text generation, summarization)
- Payment Layer: x402 protocol, USDC on Base or Cronos
- Agent Layer: Ethers.js-based bot for testing and autonomous access

## Development Goals for MVP

- Implement and test 2 AI endpoints with enforced 402/x402 protection
- Build a working payment cycle from request to on-chain payment to retry
- Deliver agent client script with full functionality
- Add simple JSON logs for transparency and debugging
- Document usage and integration process

## Advanced / Post-MVP Ideas

- On-chain audit trail of payment history and API usage
- UI for browsing services and past transactions
- Service discovery feed or registry
- Dynamic pricing by usage volume or congestion
- Integration with The Graph to index service metadata

## Vocabulary and Terminology

**x402** – Protocol standard that extends HTTP 402 to include metadata for crypto payments and enables secure retry-after-payment flows.

**Facilitator Mode** – A mode where the backend signs and submits the payment to the blockchain on behalf of the user using their signed intent, reducing gas/account burden.

**Nonce** – A per-request identifier that prevents replay attacks by ensuring each payment can only be used once.

**Payment Header (`X-Payment`)** – A signed string attached to the retry request proving that payment has been authorized by the user.

**Agent** – A programmatic entity (bot, autonomous client) that can initiate and pay for requests to a remote service without human input.

**USDC** – Stablecoin used for deterministic, low-volatility micropayments.

## Stack

- Runtime: Bun (Node.js-compatible)
- Backend: Express (via Bun support)
- AI: Gemini API (text generation/summarization)
- Payments: x402 protocol using USDC on Base/Cronos
- Agent: Bun + ethers.js or viem


## License

MIT – This project is open source and designed to be forkable and extensible by other developers during and after the x402 Hackathon.
