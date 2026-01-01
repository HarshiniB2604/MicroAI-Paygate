package main

import (
	"os"
	"testing"
)

func TestOpenAPISpecExists(t *testing.T) {
	if _, err := os.Stat("openapi.yaml"); err != nil {
		t.Fatalf("openapi.yaml not found: %v", err)
	}
}
