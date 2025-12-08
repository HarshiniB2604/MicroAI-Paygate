# Web Frontend

The Web Frontend is the user-facing interface for MicroAI Paygate. Built with Next.js, it manages the user journey from inputting text to signing crypto transactions.

## Role & Responsibilities

- **User Interface**: Provides a clean, responsive UI for text summarization.
- **Wallet Integration**: Connects to browser wallets (MetaMask, Phantom) using `ethers.js`.
- **Payment Flow Handling**:
    1.  Sends initial request.
    2.  Catches `402 Payment Required` errors.
    3.  Prompts user to sign EIP-712 typed data.
    4.  Retries request with signature headers.
- **Network Management**: Automatically detects network mismatches and prompts switching to the Base network.

## Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Blockchain Interaction**: Ethers.js v6

## Key Files

- `src/app/page.tsx`: The main application logic, including state management and the `handleSummarize` function.
- `Dockerfile`: Configuration for building the Next.js application for production.

## Development

To run the frontend locally:

```bash
bun run dev
```

The application will be available at `http://localhost:3001`.
