.PHONY: posters slides clean

# Render the A0 poster series (poster_1..4) straight from the HTML files.
# No dev server required — render_posters.js loads them over file:// and
# captures full-page screenshots at A0 portrait resolution.
posters:
	@echo "Rendering A0 poster series..."
	@node render_posters.js
	@echo "✨ Done. See poster_1_shift.png … poster_4_action.png"

# (Legacy) Capture the 15 presentation slides used by older poster experiments.
slides:
	@echo "Starting Vite dev server in the background..."
	@npm run dev > /dev/null 2>&1 & echo $$! > .vite.pid
	@sleep 3
	@node capture_slides.js
	@kill `cat .vite.pid` && rm .vite.pid

clean:
	@echo "Removing generated poster images..."
	@rm -f poster_1_shift.png poster_2_shiftleft.png poster_3_roi.png poster_4_action.png
	@echo "Cleanup complete."
