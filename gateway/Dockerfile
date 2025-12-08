# Build Stage
FROM golang:1.24-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -o gateway main.go

# Runtime Stage
FROM alpine:latest
WORKDIR /root/
COPY --from=builder /app/gateway .
EXPOSE 3000
CMD ["./gateway"]
