# Verifier Service

The Verifier is a specialized microservice dedicated to cryptographic operations. Written in Rust, it provides a secure and isolated environment for validating EIP-712 signatures.

## Role & Responsibilities

- **Signature Validation**: Receives a payment context and a signature from the Gateway.
- **ECDSA Recovery**: Uses the `ethers-rs` library to recover the signer's address from the cryptographic signature.
- **Stateless Operation**: Performs pure computation without requiring database access or session state.

## Technology Stack

- **Language**: Rust (2021 Edition)
- **Web Framework**: Axum
- **Cryptography**: `ethers-rs` (bindings to `k256` and `secp256k1`)
- **Serialization**: Serde / Serde JSON

## Key Files

- `src/main.rs`: The single-file implementation containing the HTTP server and the `verify_signature` logic.
- `Cargo.toml`: Dependency definitions including `axum`, `tokio`, and `ethers`.
- `Dockerfile`: Multi-stage build configuration producing a minimal binary.

## Development

To run the verifier locally:

```bash
cargo run
```

The service listens on port 3002 by default.
