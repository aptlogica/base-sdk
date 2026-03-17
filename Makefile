# SereniBase SDK Makefile
# Standard commands for TypeScript SDK development workflow

.PHONY: help setup install dev build test test-watch test-coverage lint lint-fix type-check docs clean

# Default target
.DEFAULT_GOAL := help

# Variables
PACKAGE_NAME := serenibase-sdk
VERSION := $(shell node -p -e "require('./package.json').version" 2>/dev/null || echo "dev")
BUILD_TIME := $(shell date -u '+%Y-%m-%d_%H:%M:%S')
NODE_VERSION := $(shell node --version 2>/dev/null || echo "unknown")

##@ Help
help: ## Display this help message
	@echo ""
	@echo "Usage: make <target>"
	@echo ""
	@echo "Available Targets:"
	@echo "  setup              - Install development dependencies"
	@echo "  install            - Alias for setup"
	@echo "  dev                - Start development mode with watch"
	@echo "  build              - Build the SDK"
	@echo "  test               - Run all tests"
	@echo "  test-watch         - Run tests in watch mode"
	@echo "  test-coverage      - Run tests with coverage report"
	@echo "  test-integration   - Run integration tests only"
	@echo "  lint               - Run ESLint"
	@echo "  lint-fix           - Run ESLint with auto-fix"
	@echo "  type-check         - Run TypeScript type checking"
	@echo "  docs               - Generate API documentation"
	@echo "  clean              - Clean build artifacts"
	@echo "  info               - Display project information"
	@echo ""

##@ Development
setup: ## Install development dependencies
	@echo "🔧 Installing development dependencies..."
	@npm install
	@echo "✅ Development setup complete"

install: setup ## Alias for setup

dev: ## Start development mode with watch
	@echo "🚀 Starting development mode with watch..."
	@npm run dev

##@ Building
build: ## Build the SDK
	@echo "🔨 Building SDK..."
	@npm run build
	@echo "✅ Build complete in dist/"

##@ Testing
test: ## Run all tests
	@echo "🧪 Running tests..."
	@npm test

test-watch: ## Run tests in watch mode
	@echo "👀 Running tests in watch mode..."
	@npm run test:watch

test-coverage: ## Run tests with coverage report
	@echo "📊 Running tests with coverage..."
	@npm run test:coverage
	@echo "📈 Coverage report generated in coverage/"

test-integration: ## Run integration tests only
	@echo "🔗 Running integration tests..."
	@npm run test:integration

##@ Code Quality
lint: ## Run ESLint
	@echo "🔍 Running ESLint..."
	@npm run lint

lint-fix: ## Run ESLint and fix issues automatically
	@echo "🔧 Running ESLint with auto-fix..."
	@npm run lint:fix

type-check: ## Run TypeScript type checking
	@echo "📋 Running type checks..."
	@npm run type-check

##@ Documentation
docs: ## Generate API documentation
	@echo "📚 Generating TypeDoc documentation..."
	@npm run docs
	@echo "✅ Documentation generated"

##@ Cleanup
clean: ## Clean build artifacts
	@echo "🧹 Cleaning..."
	@rm -rf dist coverage
	@echo "✅ Clean complete"

##@ Info
info: ## Display project information
	@echo "📦 Project: $(PACKAGE_NAME)"
	@echo "📌 Version: $(VERSION)"
	@echo "🕐 Build Time: $(BUILD_TIME)"
	@echo "📍 Node Version: $(NODE_VERSION)"
