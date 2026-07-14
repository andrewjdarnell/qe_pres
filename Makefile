.PHONY: posters clean

# Target to generate all posters
posters:
	@echo "Starting Vite dev server in the background..."
	@npm run dev > /dev/null 2>&1 & echo $$! > .vite.pid
	@echo "Waiting for server to initialize..."
	@sleep 3
	@echo "Capturing presentation slides (1-15)..."
	@node capture_slides.js
	@echo "Capturing A0 Posters..."
	@node poster_screenshot.js
	@echo "Cleaning up dev server..."
	@kill `cat .vite.pid` && rm .vite.pid
	@echo "✨ Poster generation complete! Check the root directory for poster_*.png"

# Target to clean up generated assets
clean:
	@echo "Removing generated poster images..."
	@rm -f poster_*.png
	@echo "Removing captured slides..."
	@rm -rf assets/slides/*
	@echo "Cleanup complete."
