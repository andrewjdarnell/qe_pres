.PHONY: help posters slides view-posters view-slides clean
.DEFAULT_GOAL := help

POSTER_DIR := generated/posters
SLIDE_DIR  := generated/slides

# Print this help (the default target). Descriptions come from the `## ` tags below.
help:
	@echo "QE presentation — make targets:"
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "} {printf "  \033[36m%-14s\033[0m %s\n", $$1, $$2}'

# Render the A0 poster series (poster_1..4) straight from the HTML files.
# No dev server required — render_posters.js loads them over file:// and
# captures full-page screenshots at A0 portrait resolution into $(POSTER_DIR).
posters: ## Render the A0 poster series -> generated/posters/
	@echo "Rendering A0 poster series..."
	@node render_posters.js
	@echo "✨ Done. See $(POSTER_DIR)/poster_1_shift.png … poster_4_action.png"

# (Legacy) Capture the 15 presentation slides into $(SLIDE_DIR).
slides: ## Capture the 15 deck slides -> generated/slides/ (starts Vite)
	@echo "Starting Vite dev server in the background..."
	@npm run dev > /dev/null 2>&1 & echo $$! > .vite.pid
	@sleep 3
	@node capture_slides.js
	@kill `cat .vite.pid` && rm .vite.pid
	@echo "✨ Done. See $(SLIDE_DIR)/slide_1.png … slide_15.png"

# Open the rendered posters in Preview (macOS).
view-posters: ## Open the rendered posters in Preview (macOS)
	@open $(POSTER_DIR)/*.png

# Open the captured slides in Preview (macOS).
view-slides: ## Open the captured slides in Preview (macOS)
	@open $(SLIDE_DIR)/*.png

clean: ## Remove all generated posters and slides
	@echo "Removing generated posters and slides..."
	@rm -f $(POSTER_DIR)/*.png $(SLIDE_DIR)/*.png
	@echo "Cleanup complete."
