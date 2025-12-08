# phrases.md

## Key Phrases and Concepts in MicroAI Paygate

This document defines the important recurring phrases, technical terms, and concepts used throughout the MicroAI Paygate project. These terms describe the architecture, logic, and principles behind the system.

---

### x402 Protocol

A specification that leverages the `HTTP 402 Payment Required` status code to enforce per-request cryptocurrency payments. It enables clients to receive a quote for a service and retry the same request after submitting a verifiable on-chain or gasless payment. It introduces a clean standard for monetizing APIs in Web3 environments.

---

### 402 Flow

The standard interaction flow in this system:
1. Client sends an HTTP request.
2. Server returns `402 Payment Required` with pricing and metadata.
3. Client signs the payment data and retries the request.
4. Server validates payment and returns the response.

This ensures no resource is accessed without valid payment.

---

### Per-Request Monetization

Each API call is priced and billed independently. Clients are charged a fixed or dynamic amount per call (e.g., $0.01 USDC), with no reliance on accounts, subscriptions, or quotas. This model aligns well with micropayments and usage-based service billing.

---

### Facilitator Mode

A payment mode where the client submits a signed intent and the server, acting as a facilitator, relays the transaction to the blockchain. This allows for gasless UX from the client side and simplifies integration, especially for lightweight agents or web clients.

---

### Signed Payment Metadata

The client cryptographically signs a payload containing:
- recipient address
- token symbol (e.g., USDC)
- amount to pay
- nonce (unique per request)

This ensures the payment is authentic, untampered, and valid for a single-use action.

---

### Nonce

A one-time numeric value generated per request. It prevents replay attacks and ensures that a payment signature can only be used once. Servers must verify that nonces are unique and unused before processing requests.

---

### X-Payment Header

A custom HTTP header used in the retry request. It contains the signed payment metadata. The server extracts this header to verify the client has authorized and submitted payment for the requested resource.

---

### Autonomous Agent

A software client or bot capable of making independent API calls, parsing `402` responses, handling private key signing, and retrying with a valid payment. Agents can interact with services like `/summarize` without human intervention.

---

### Service Endpoint

An individual function exposed by the API. Each service is priced independently. Example endpoints include:
- `/summarize`: returns a GPT-generated summary of input text
- `/sentiment`: returns sentiment classification

These endpoints are protected by x402 and require payment to access.

---

### USDC Stablecoin

The default token accepted for payments. USDC is used due to its low volatility and wide support on chains like Base and Cronos. Pricing is denominated in fiat-equivalent units to simplify UX and developer accounting.

---

### Local Settlement

An alternative to facilitator mode. The client must send a signed transaction directly to the blockchain, and the server verifies the transaction and payment on-chain. More secure but requires full wallet integration on the client side.

---

### Payment Enforcement Middleware

The component of the server responsible for:
- Returning `402` with pricing
- Issuing nonces
- Verifying payment signatures
- Preventing access to protected endpoints without valid payment

---

### Agent Economy

A broader concept where autonomous software clients — not just humans — pay for and consume web services. MicroAI Paygate is an implementation of this idea, where agents can interact with AI services by paying per-use through smart contracts or facilitators.

---

### Retry Window

A small time window (e.g., 1–2 minutes) during which a successful payment can be retried if the client crashes or disconnects. Prevents users from losing money due to temporary failures after successful payment.

---

### Payment Audit Trail

The logged and verifiable record of:
- Requests made
- Nonces issued
- Signatures received
- Payments submitted
- Responses returned

Can be extended to build analytics, receipts, and dashboards.

---
