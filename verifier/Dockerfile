# Build Stage
FROM rust:1.85-alpine AS builder
WORKDIR /app
RUN apk add --no-cache musl-dev
COPY . .
RUN cargo build --release

# Runtime Stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/target/release/verifier .
EXPOSE 3002
CMD ["./verifier"]
