.PHONY: help install run dev build preview posters slides view-posters view-slides clean
.DEFAULT_GOAL := help

POSTER_DIR := generated/posters
SLIDE_DIR  := assets/slides

# Print this help (the default target). Descriptions come from the `## ` tags below.
help:
	@echo "QE presentation — make targets:"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "} {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

# ---------- Local environment ----------

install: ## Install project dependencies
	npm install

dev: ## Start the Vite development server
	npm run dev

run: dev ## Start the Vite development server (alias for dev)

build: ## Build the production-ready static files
	npm run build

preview: ## Preview the production build locally
	npm run preview

# ---------- Posters & slide captures ----------

# Render the A0 poster series (poster_1..5) straight from the HTML files.
# render_posters.js loads them over file:// and captures full-page screenshots
# at A0 portrait resolution into $(POSTER_DIR). Poster 5 embeds the slide
# captures, so run `make slides` first after any deck change.
posters: ## Render the A0 poster series -> generated/posters/
	@echo "Rendering A0 poster series..."
	@node render_posters.js
	@sips -s dpiWidth 300 -s dpiHeight 300 $(POSTER_DIR)/poster_*.png >/dev/null
	@echo "✨ Done. See $(POSTER_DIR)/poster_1_shift.png … poster_5_slides.png"

# Capture the deck slides (count auto-detected) into assets/slides/.
slides: ## Capture the deck slides -> assets/slides/ (starts Vite)
	@echo "Starting Vite dev server in the background..."
	@npm run dev > /dev/null 2>&1 & echo $$! > .vite.pid
	@sleep 3
	@node capture_slides.js
	@kill `cat .vite.pid` && rm .vite.pid
	@echo "✨ Done. See $(SLIDE_DIR)/slide_01.png … slide_14.png"

# Open the rendered posters in Preview (macOS).
view-posters: ## Open the rendered posters in Preview (macOS)
	@open $(POSTER_DIR)/*.png

# Open the captured slides in Preview (macOS).
view-slides: ## Open the captured slides in Preview (macOS)
	@open $(SLIDE_DIR)/*.png

clean: ## Remove build output and generated posters/slides
	@echo "Removing dist, generated posters, and captured slides..."
	@rm -rf dist
	@rm -f $(POSTER_DIR)/*.png $(SLIDE_DIR)/*.png
	@echo "Cleanup complete."
