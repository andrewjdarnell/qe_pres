import re

with open('index.html', 'r') as f:
    content = f.read()

# Font
content = content.replace(
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">',
    '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">'
)

# Ambient BG
bg_html = """    <!-- Ambient Background -->
    <div id="ambient-bg">
      <div class="orb orb-1"></div>
      <div class="orb orb-2"></div>
      <div class="orb orb-3"></div>
      <div class="noise-overlay"></div>
    </div>"""
content = content.replace('<body>', f'<body>\n{bg_html}')

# Wrapper
content = content.replace('<div id="presentation">', '<div id="presentation-wrapper">\n      <main id="presentation">')
content = content.replace('</div>\n    <script type="module" src="/src/main.js"></script>', '      </main>\n    </div>\n    <script type="module" src="/src/main.js"></script>')

# Product piles
content = content.replace('<div class="sim-actor tester" id="qa-tester-1">🕵️</div>', '<div class="sim-actor tester" id="qa-tester-1" aria-label="Tester">🕵️</div>\n                  <div class="product-pile" id="qa-pile-1"></div>')
content = content.replace('<div class="sim-actor tester" id="qa-tester-2">🕵️</div>', '<div class="sim-actor tester" id="qa-tester-2" aria-label="Tester">🕵️</div>\n                  <div class="product-pile" id="qa-pile-2"></div>')
content = content.replace('<div class="sim-actor tester" id="qe-tester-1">🤖</div>', '<div class="sim-actor tester" id="qe-tester-1" aria-label="Tester">🤖</div>\n                  <div class="product-pile" id="qe-pile-1"></div>')
content = content.replace('<div class="sim-actor tester" id="qe-tester-2">🤖</div>', '<div class="sim-actor tester" id="qe-tester-2" aria-label="Tester">🤖</div>\n                  <div class="product-pile" id="qe-pile-2"></div>')

# Change <div class="slide"> to <section class="slide"> and properly close it
# We will just leave it as <div class="slide"> to avoid parsing issues, but update styles to target .slide.

with open('index.html', 'w') as f:
    f.write(content)
