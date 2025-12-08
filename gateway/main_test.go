package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
)

func TestHandleSummarize_NoHeaders(t *testing.T) {
	// Setup
	gin.SetMode(gin.TestMode)
	r := gin.Default()
	r.POST("/api/ai/summarize", handleSummarize)

	// Request
	req, _ := http.NewRequest("POST", "/api/ai/summarize", nil)
	w := httptest.NewRecorder()
	r.ServeHTTP(w, req)

	// Assertions
	if w.Code != 402 {
		t.Errorf("Expected status 402, got %d", w.Code)
	}

	var response map[string]interface{}
	err := json.Unmarshal(w.Body.Bytes(), &response)
	if err != nil {
		t.Fatalf("Failed to parse response JSON: %v", err)
	}

	if response["error"] != "Payment Required" {
		t.Errorf("Expected error 'Payment Required', got '%v'", response["error"])
	}

	if response["paymentContext"] == nil {
		t.Error("Expected paymentContext to be present")
	}
}
