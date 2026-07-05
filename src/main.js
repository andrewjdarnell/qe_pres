import './style.css';

// Slide Management
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
let currentSlideIndex = 0;

function updateSlides() {
  slides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  // Update progress bar
  const progress = ((currentSlideIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  // Trigger animation logic if on the animation slide
  if (slides[currentSlideIndex].id === 'animation-slide') {
    startSimulation();
  } else {
    stopSimulation();
  }
}

function nextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    updateSlides();
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateSlides();
  }
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'Space') {
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
    prevSlide();
  }
});

// Click Navigation (Left half goes prev, Right half goes next)
document.addEventListener('click', (e) => {
  // Ignore clicks on buttons/inputs inside the presentation
  if (e.target.tagName.toLowerCase() === 'button' || e.target.closest('.sim-controls') || e.target.closest('button')) return;
  
  const width = window.innerWidth;
  if (e.clientX > width / 2) {
    nextSlide();
  } else {
    prevSlide();
  }
});


// ---------------------------------------------------------
// Interactive Sprint Simulation Logic (Slide 6)
// ---------------------------------------------------------

let currentSprint = 0;
const maxSprints = 10;
let isPlaying = false;
let playInterval = null;

// DOM Elements
const sprintNumBadge = document.getElementById('sim-sprint-num');
const btnNextSprint = document.getElementById('btn-next-sprint');
const btnPlaySprint = document.getElementById('btn-play-sprint');
const btnResetSprint = document.getElementById('btn-reset-sprint');

const qaStatBuilt = document.getElementById('qa-stat-built');
const qaStatVerified = document.getElementById('qa-stat-verified');
const qaStatEscaped = document.getElementById('qa-stat-escaped');
const qaExplanation = document.getElementById('qa-explanation');

const qeStatBuilt = document.getElementById('qe-stat-built');
const qeStatVerified = document.getElementById('qe-stat-verified');
const qeStatEscaped = document.getElementById('qe-stat-escaped');
const qeExplanation = document.getElementById('qe-explanation');

const qaLanes = [
  document.getElementById('qa-lane-1'),
  document.getElementById('qa-lane-2')
];
const qeLanes = [
  document.getElementById('qe-lane-1'),
  document.getElementById('qe-lane-2')
];

// State variables for active blocks
let activeSimBlocks = [];
let simAnimationId = null;
let simRunning = false;

// Event Listeners for Simulation controls
btnNextSprint.addEventListener('click', () => {
  if (currentSprint < maxSprints) {
    runSprint(currentSprint + 1);
  }
});

btnPlaySprint.addEventListener('click', () => {
  if (isPlaying) {
    pauseSimulation();
  } else {
    playSimulation();
  }
});

btnResetSprint.addEventListener('click', () => {
  resetSimulation();
});

// Simulation Metrics configuration
const sprintData = {
  // Sprint index: [Features Built per lane, QA manual process limit per lane, QE process limit per lane]
  1: { built: 3, qaLimit: 3, qeLimit: 3, qaDesc: "QA keeps pace. Manual regression testing covers all new features.", qeDesc: "Initial automation scripts are created. Feedback loops begin to form." },
  2: { built: 4, qaLimit: 3, qeLimit: 4, qaDesc: "Codebase grows. QA manual regression takes longer. Stress builds up.", qeDesc: "Automation handles regression. QE has time to build more scripts." },
  3: { built: 5, qaLimit: 3, qeLimit: 5, qaDesc: "QA runs out of time. Risk-based testing starts: minor features are skipped.", qeDesc: "Automation reaches 60% coverage. Tests run on every commit in pipeline." },
  4: { built: 6, qaLimit: 3, qeLimit: 6, qaDesc: "QA bottleneck starts. Manual execution cannot process 6 new features.", qeDesc: "Tests run in parallel. Feedback to developers takes only minutes." },
  5: { built: 7, qaLimit: 3, qeLimit: 7, qaDesc: "Testing queue overflows. QA is forced to skip integration validations.", qeDesc: "Automation covers 80% of codebase. QE works on infrastructure." },
  6: { built: 8, qaLimit: 3, qeLimit: 8, qaDesc: "Developers wait days for QA results. Feedback loops are broken.", qeDesc: "Continuous delivery is enabled. Releases are stable and frequent." },
  7: { built: 9, qaLimit: 3, qeLimit: 9, qaDesc: "Only critical path is manually tested. Escaped bugs begin to rise.", qeDesc: "No manual gatekeepers needed. Framework scales instantly." },
  8: { built: 10, qaLimit: 3, qeLimit: 10, qaDesc: "QA is overwhelmed. Bug fixes take longer because context is lost.", qeDesc: "100% of critical paths automated. Devs build quality directly in." },
  9: { built: 11, qaLimit: 3, qeLimit: 11, qaDesc: "Testing quality drops. Production incidents occur regularly.", qeDesc: "Testing capacity matches development growth. No friction." },
  10: { built: 13, qaLimit: 3, qeLimit: 13, qaDesc: "Siloed QA model fails under scale. High costs, slow releases, bugs in wild.", qeDesc: "Predictable, safe, scalable releases. Quality is built into the culture." }
};

// Cumulative statistics
let stats = {
  qa: { built: 0, verified: 0, escaped: 0 },
  qe: { built: 0, verified: 0, escaped: 0 }
};

function runSprint(sprint) {
  if (sprint > maxSprints) return;
  currentSprint = sprint;
  sprintNumBadge.textContent = `Sprint ${currentSprint} / ${maxSprints}`;
  
  const config = sprintData[currentSprint];
  
  // Update explanations
  qaExplanation.innerHTML = `<strong>Sprint ${currentSprint}:</strong> ${config.qaDesc}`;
  qeExplanation.innerHTML = `<strong>Sprint ${currentSprint}:</strong> ${config.qeDesc}`;
  
  // Calculate new stats
  const qaBuiltThisSprint = config.built * qaLanes.length;
  const qaVerifiedThisSprint = Math.min(config.built, config.qaLimit) * qaLanes.length;
  const qaEscapedThisSprint = Math.max(0, config.built - config.qaLimit) * qaLanes.length;
  
  const qeBuiltThisSprint = config.built * qeLanes.length;
  const qeVerifiedThisSprint = Math.min(config.built, config.qeLimit) * qeLanes.length;
  const qeEscapedThisSprint = Math.max(0, config.built - config.qeLimit) * qeLanes.length;
  
  // Update stats counters
  stats.qa.built += qaBuiltThisSprint;
  stats.qa.verified += qaVerifiedThisSprint;
  stats.qa.escaped += qaEscapedThisSprint;
  
  stats.qe.built += qeBuiltThisSprint;
  stats.qe.verified += qeVerifiedThisSprint;
  stats.qe.escaped += qeEscapedThisSprint;
  
  animateCounters();
  
  // Spawn blocks on lanes
  // QA Lanes Spawning
  qaLanes.forEach((lane, laneIdx) => {
    spawnBlocksForLane(lane, 'qa', config.built, config.qaLimit, laneIdx);
  });
  
  // QE Lanes Spawning
  qeLanes.forEach((lane, laneIdx) => {
    spawnBlocksForLane(lane, 'qe', config.built, config.qeLimit, laneIdx);
  });
  
  // Check if reached max sprint
  if (currentSprint === maxSprints) {
    pauseSimulation();
    btnNextSprint.disabled = true;
  }
}

function spawnBlocksForLane(lane, mode, count, limit, laneIdx) {
  const laneWidth = lane.clientWidth || 550;
  const startPos = 45;
  const endPos = laneWidth - 65;
  
  // Active tester glow animation
  const testerEl = lane.querySelector('.sim-actor.tester');
  if (testerEl) {
    testerEl.classList.add('active-tester');
    setTimeout(() => {
      testerEl.classList.remove('active-tester');
    }, 1500);
  }

  for (let i = 0; i < count; i++) {
    const block = document.createElement('div');
    block.className = 'sim-block';
    block.textContent = '{ }';
    
    // Position blocks staggered slightly
    block.style.transform = `translateX(${startPos}px)`;
    lane.appendChild(block);
    
    // Determine if this specific block gets verified or skipped
    let destinationState = 'passed';
    if (mode === 'qa' && i >= limit) {
      destinationState = 'skipped';
    }
    
    activeSimBlocks.push({
      el: block,
      pos: startPos,
      targetPos: endPos - (i * 20),
      speed: 3 + Math.random() * 2,
      mode: mode,
      state: 'moving', // moving, testing, passed, skipped
      destinationState: destinationState,
      delay: i * 150 // Stagger spawn times
    });
  }
}

function updateSimAnimation() {
  if (!simRunning) return;
  
  activeSimBlocks.forEach(block => {
    if (block.delay > 0) {
      block.delay -= 16.7; // Approx ms per frame
      block.el.style.opacity = '0';
      return;
    }
    block.el.style.opacity = '1';
    
    if (block.state === 'moving') {
      block.pos += block.speed;
      block.el.style.transform = `translateX(${block.pos}px)`;
      
      if (block.pos >= block.targetPos) {
        if (block.destinationState === 'skipped') {
          // QA Bottleneck: Turns red, slips off the belt as escaped bug
          block.state = 'skipped';
          block.el.classList.add('skipped');
          setTimeout(() => {
            if (block.el.parentNode) block.el.parentNode.removeChild(block.el);
          }, 400);
        } else {
          // Normal Verification: Turns green, disappears
          block.state = 'passed';
          block.el.classList.add('passed');
          setTimeout(() => {
            if (block.el.parentNode) block.el.parentNode.removeChild(block.el);
          }, 400);
        }
      }
    }
  });
  
  // Clean up completed blocks
  activeSimBlocks = activeSimBlocks.filter(b => b.state === 'moving');
  
  simAnimationId = requestAnimationFrame(updateSimAnimation);
}

function animateCounters() {
  qaStatBuilt.textContent = stats.qa.built;
  qaStatVerified.textContent = stats.qa.verified;
  qaStatEscaped.textContent = stats.qa.escaped;
  
  qeStatBuilt.textContent = stats.qe.built;
  qeStatVerified.textContent = stats.qe.verified;
  qeStatEscaped.textContent = stats.qe.escaped;
}

function playSimulation() {
  isPlaying = true;
  btnPlaySprint.textContent = 'Pause';
  btnPlaySprint.classList.add('active-btn');
  
  playInterval = setInterval(() => {
    if (currentSprint < maxSprints) {
      runSprint(currentSprint + 1);
    } else {
      pauseSimulation();
    }
  }, 2500);
}

function pauseSimulation() {
  isPlaying = false;
  btnPlaySprint.textContent = 'Autoplay';
  btnPlaySprint.classList.remove('active-btn');
  if (playInterval) clearInterval(playInterval);
}

function resetSimulation() {
  pauseSimulation();
  currentSprint = 0;
  sprintNumBadge.textContent = `Sprint 0 / ${maxSprints}`;
  btnNextSprint.disabled = false;
  
  stats.qa = { built: 0, verified: 0, escaped: 0 };
  stats.qe = { built: 0, verified: 0, escaped: 0 };
  animateCounters();
  
  qaExplanation.textContent = 'Press "Next Sprint" to start development and testing simulation.';
  qeExplanation.textContent = 'Press "Next Sprint" to start development and testing simulation.';
  
  // Clear any active blocks from DOM
  activeSimBlocks.forEach(b => {
    if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
  });
  activeSimBlocks = [];
}

function startSimulation() {
  if (simRunning) return;
  simRunning = true;
  simAnimationId = requestAnimationFrame(updateSimAnimation);
}

function stopSimulation() {
  simRunning = false;
  pauseSimulation();
  cancelAnimationFrame(simAnimationId);
  resetSimulation();
}

// Initial Setup
updateSlides();
