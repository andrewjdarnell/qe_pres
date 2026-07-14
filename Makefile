.DEFAULT_GOAL := help

.PHONY: help
help: ## Display this help message
	@echo "Usage: make [target]"
	@echo ""
	@echo "Targets:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install: ## Install project dependencies
	npm install

.PHONY: run
run: ## Start the Vite development server (shortcut for dev)
	npm run dev

.PHONY: dev
dev: ## Start the Vite development server
	npm run dev

.PHONY: stop
stop: ## Stop the Vite development server
	pkill -f "vite" || true

.PHONY: build
build: ## Build the production-ready static files
	npm run build

.PHONY: preview
preview: ## Preview the production build locally
	npm run preview

.PHONY: clean
clean: ## Remove build artifacts (dist folder)
	rm -rf dist
