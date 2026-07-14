import './style.css';
import gsap from 'gsap';

// Slide Management
const slides = document.querySelectorAll('.slide');
const progressBar = document.getElementById('progress-bar');
const timerProgressBar = document.getElementById('timer-progress-bar');
const btnTimerToggle = document.getElementById('btn-timer-toggle');

let currentSlideIndex = 0;
let isTimedMode = false;
let slideTimeout = null;
let timerDuration = 0;

// Aspect Ratio Scaling
function resizePresentation() {
  const wrapper = document.getElementById('presentation-wrapper');
  const presentation = document.getElementById('presentation');
  if (!wrapper || !presentation) return;
  const scale = Math.min(
    wrapper.clientWidth / 1280,
    wrapper.clientHeight / 720
  );
  presentation.style.transform = `scale(${scale})`;
}
window.addEventListener('resize', resizePresentation);
resizePresentation();

function updateSlides() {
  slides.forEach((slide, index) => {
    if (index === currentSlideIndex) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });

  const progress = ((currentSlideIndex + 1) / slides.length) * 100;
  progressBar.style.width = `${progress}%`;
  
  if (slides[currentSlideIndex].id === 'animation-slide') {
    startSimulation();
  } else {
    stopSimulation();
  }

  // Update navigation buttons active state
  const navButtons = document.querySelectorAll('.slide-nav-btn');
  navButtons.forEach((btn, index) => {
    if (index === currentSlideIndex) {
      btn.classList.add('active-nav-btn');
    } else {
      btn.classList.remove('active-nav-btn');
    }
  });

  resetSlideTimer();
}

function nextSlide() {
  if (currentSlideIndex < slides.length - 1) {
    currentSlideIndex++;
    updateSlides();
  } else if (isTimedMode) {
    currentSlideIndex = 0;
    updateSlides();
  }
}

function prevSlide() {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateSlides();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === 'Space') nextSlide();
  else if (e.key === 'ArrowLeft' || e.key === 'Backspace') prevSlide();
});

document.addEventListener('click', (e) => {
  if (
    e.target.tagName.toLowerCase() === 'button' || 
    e.target.closest('.sim-controls') || 
    e.target.closest('button') ||
    e.target.id === 'btn-timer-toggle'
  ) return;
  
  if (e.clientX > window.innerWidth / 2) nextSlide();
  else prevSlide();
});

function getSlideDuration(index) {
  const slide = slides[index];
  if (slide.id === 'animation-slide') return 60000;
  if (index === slides.length - 1) return 30000;
  return 20000;
}

function resetSlideTimer() {
  if (slideTimeout) {
    clearTimeout(slideTimeout);
    slideTimeout = null;
  }
  timerProgressBar.style.transition = 'none';
  timerProgressBar.style.width = '0%';
  
  if (!isTimedMode) return;
  timerDuration = getSlideDuration(currentSlideIndex);
  
  timerProgressBar.offsetHeight; 
  timerProgressBar.style.transition = `width ${timerDuration}ms linear`;
  timerProgressBar.style.width = '100%';

  slideTimeout = setTimeout(nextSlide, timerDuration);
}

btnTimerToggle.addEventListener('click', () => {
  isTimedMode = !isTimedMode;
  btnTimerToggle.textContent = isTimedMode ? 'Mode: Timed' : 'Mode: Manual';
  btnTimerToggle.classList.toggle('timed-active', isTimedMode);
  resetSlideTimer();
});

// Interactive Sprint Simulation Logic
let currentSprint = 0;
const maxSprints = 10;
let isPlaying = false;
let playInterval = null;

const sprintNumBadge = document.getElementById('sim-sprint-num');
const btnNextSprint = document.getElementById('btn-next-sprint');
const btnPlaySprint = document.getElementById('btn-play-sprint');
const btnResetSprint = document.getElementById('btn-reset-sprint');

const qaStatBuilt = document.getElementById('qa-stat-built');
const qaStatVerified = document.getElementById('qa-stat-verified');
const qaStatEscaped = document.getElementById('qa-stat-escaped');
const qaStatRejected = document.getElementById('qa-stat-rejected');
const qaExplanation = document.getElementById('qa-explanation');

const qeStatBuilt = document.getElementById('qe-stat-built');
const qeStatVerified = document.getElementById('qe-stat-verified');
const qeStatEscaped = document.getElementById('qe-stat-escaped');
const qeStatRejected = document.getElementById('qe-stat-rejected');
const qeExplanation = document.getElementById('qe-explanation');

const qaLane = document.getElementById('qa-lane');
const qeLane = document.getElementById('qe-lane');

let activeSimBlocks = [];
let simRunning = false;

btnNextSprint.addEventListener('click', () => {
  if (currentSprint < maxSprints) runSprint(currentSprint + 1);
});

btnPlaySprint.addEventListener('click', () => {
  if (isPlaying) pauseSimulation();
  else playSimulation();
});

btnResetSprint.addEventListener('click', resetSimulation);

const sprintData = {
  1: { built: 3, qaLimit: 3, qeLimit: 3, qaDesc: "Keeps pace. Manual regression covers all new features.", qeDesc: "Initial automation scripts created. CI/CD set up. Initial feedback loops in place." },
  2: { built: 4, qaLimit: 3, qeLimit: 4, qaDesc: "Codebase grows. QA manual regression takes longer. Stress builds.", qeDesc: "Automation handles regression. QE builds more scripts for new features." },
  3: { built: 5, qaLimit: 3, qeLimit: 5, qaDesc: "Risk-based testing starts. Minor features (low risk) are skipped.", qeDesc: "Automation reaches 60% coverage. All tests run on every commit." },
  4: { built: 6, qaLimit: 3, qeLimit: 6, qaDesc: "Bottleneck starts. Manual testing cannot keep up.", qeDesc: "Tests run in parallel. Feedback loop completes in minutes." },
  5: { built: 7, qaLimit: 3, qeLimit: 7, qaDesc: "Queue overflows. Some integration validations must be skipped to keep schedule.", qeDesc: "Automation hits 80%. QE works on test infrastructure." },
  6: { built: 8, qaLimit: 3, qeLimit: 8, qaDesc: "Devs wait days for manual results. Feedback loops break.", qeDesc: "Continuous delivery enabled. Releases are stable and frequent." },
  7: { built: 9, qaLimit: 3, qeLimit: 9, qaDesc: "Only critical path verified. Escaped bugs rise rapidly.", qeDesc: "No manual gatekeepers needed. Framework scales instantly." },
  8: { built: 10, qaLimit: 3, qeLimit: 10, qaDesc: "QA overwhelmed. Bug fixes slow down as context is lost. Regressions appear in unusual places.", qeDesc: "100% of critical paths automated. Devs build quality in." },
  9: { built: 11, qaLimit: 3, qeLimit: 11, qaDesc: "Testing quality drops. Production incidents rise.", qeDesc: "Capacity matches development growth. No friction." },
  10: { built: 13, qaLimit: 3, qeLimit: 13, qaDesc: "Siloed model fails. High costs, slow releases, bugs in wild.", qeDesc: "Predictable, safe, scalable releases. Quality-driven culture. People sleep at night." }
};

let stats = {
  qa: { built: 0, verified: 0, escaped: 0, rejected: 0 },
  qe: { built: 0, verified: 0, escaped: 0, rejected: 0 }
};

function runSprint(sprint) {
  if (sprint > maxSprints) return;
  currentSprint = sprint;
  sprintNumBadge.textContent = `Sprint ${currentSprint} / ${maxSprints}`;
  
  const config = sprintData[currentSprint];
  qaExplanation.innerHTML = `<strong>Sprint ${currentSprint}:</strong> ${config.qaDesc}`;
  qeExplanation.innerHTML = `<strong>Sprint ${currentSprint}:</strong> ${config.qeDesc}`;
  
  const processLane = (lane, mode, count, limit) => {
    for (let i = 0; i < count; i++) {
      const isRejected = Math.random() < 0.25;
      let destinationState = 'passed';
      if (mode === 'qa' && i >= limit) destinationState = 'skipped';
      
      spawnBlock(lane, mode, destinationState, isRejected, i);
    }
  };

  processLane(qaLane, 'qa', config.built, config.qaLimit);
  processLane(qeLane, 'qe', config.built, config.qeLimit);

  // Update automated test suite count representation in QE panel
  let qeCumulativeBuilt = 0;
  for (let s = 1; s <= currentSprint; s++) {
    qeCumulativeBuilt += sprintData[s].built;
  }
  const qeCovMap = { 0:0, 1:30, 2:45, 3:60, 4:70, 5:80, 6:85, 7:90, 8:100, 9:100, 10:100 };
  const currentQeCov = qeCovMap[currentSprint] || 0;
  const automatedCount = Math.round((qeCumulativeBuilt * currentQeCov) / 100);
  
  updateAutomatedTests(qeCumulativeBuilt, automatedCount);

  // Update dynamic stats like coverage and product size details
  updateSprintStats();

  if (currentSprint === maxSprints) {
    pauseSimulation();
    btnNextSprint.disabled = true;
  }
}

function spawnBlock(lane, mode, destinationState, isRejected, index) {
  const startPos = 120;
  const testerPos = 430;
  const pilePos = 490;

  const block = document.createElement('div');
  block.className = 'sim-block';
  block.textContent = '{ }';
  block.style.transform = `translateX(${startPos}px)`;
  lane.appendChild(block);
  activeSimBlocks.push(block);

  const delay = index * 0.15;
  const duration = 0.8 + Math.random() * 0.4;
  
  const tl = gsap.timeline({ delay: delay });

  tl.to(block, {
    x: testerPos,
    duration: duration,
    ease: "power1.inOut",
    onComplete: () => {
      const testerEl = lane.querySelector('.sim-actor.tester');
      if (testerEl) {
        gsap.to(testerEl, {
          backgroundColor: mode === 'qe' ? "rgba(16, 185, 129, 0.4)" : "rgba(14, 165, 233, 0.4)", 
          boxShadow: mode === 'qe' ? "0 0 15px rgba(16,185,129,0.8)" : "0 0 15px rgba(14,165,233,0.8)", 
          duration: 0.1, 
          yoyo: true, 
          repeat: 1
        });
      }
    }
  });

  if (destinationState === 'skipped') {
    tl.to(block, { backgroundColor: "var(--accent-red)", duration: 0.1 });
    tl.to(block, {
      x: pilePos,
      y: 20,
      opacity: 0,
      scale: 0.5,
      duration: 0.4,
      onComplete: () => {
        addToPile(lane, mode, 'red');
        updateStat(mode, 'escaped');
        block.remove();
      }
    });
  } else if (isRejected) {
    tl.to(block, { backgroundColor: "var(--accent-warning)", duration: 0.2 });
    tl.to(block, {
      x: startPos,
      duration: duration,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(block, { 
          opacity: 0, 
          scale: 0, 
          duration: 0.3, 
          onComplete: () => {
            updateStat(mode, 'rejected');
            block.remove();
          } 
        });
      }
    });
  } else {
    tl.to(block, { backgroundColor: "var(--accent-green)", duration: 0.1 });
    tl.to(block, {
      x: pilePos,
      opacity: 0,
      scale: 0.5,
      duration: 0.3,
      onComplete: () => {
        addToPile(lane, mode, 'green');
        updateStat(mode, 'verified');
        block.remove();
      }
    });
  }
  
  updateStat(mode, 'built');
}

function addToPile(lane, mode, colorClass) {
  const pileId = `${mode}-pile`;
  let pileContainer = document.getElementById(pileId);
  if (!pileContainer) return;
  
  const pileItem = document.createElement('div');
  pileItem.className = `pile-block ${colorClass}`;
  
  const childCount = pileContainer.children.length;
  const cols = 4;
  const x = (childCount % cols) * 12;
  const y = -Math.floor(childCount / cols) * 12;
  
  pileItem.style.transform = `translate(${x}px, ${y}px)`;
  pileContainer.appendChild(pileItem);
  
  gsap.from(pileItem, { opacity: 0, scale: 0, duration: 0.3, ease: "back.out(1.5)" });
}

function updateStat(mode, statKey) {
  stats[mode][statKey]++;
  animateCounters();
}

function animateCounters() {
  qaStatBuilt.textContent = stats.qa.built;
  qaStatVerified.textContent = stats.qa.verified;
  qaStatEscaped.textContent = stats.qa.escaped;
  if (qaStatRejected) qaStatRejected.textContent = stats.qa.rejected;
  
  qeStatBuilt.textContent = stats.qe.built;
  qeStatVerified.textContent = stats.qe.verified;
  qeStatEscaped.textContent = stats.qe.escaped;
  if (qeStatRejected) qeStatRejected.textContent = stats.qe.rejected;
}

function updateSprintStats() {
  const config = sprintData[currentSprint] || { built: 0, qaLimit: 0, qeLimit: 0 };
  
  let qaCumulativeBuilt = 0;
  let qeCumulativeBuilt = 0;
  for (let s = 1; s <= currentSprint; s++) {
    qaCumulativeBuilt += sprintData[s].built;
    qeCumulativeBuilt += sprintData[s].built;
  }
  
  const qaReg = currentSprint > 1 ? qaCumulativeBuilt - config.built : 0;
  const qeReg = currentSprint > 1 ? qeCumulativeBuilt - config.built : 0;
  
  const totalQAWork = config.built + qaReg;
  let qaCoverage = 100;
  if (currentSprint > 0) {
    qaCoverage = Math.min(100, Math.round((config.qaLimit / totalQAWork) * 100));
  }
  
  const qeCoverageMap = {
    0: 0,
    1: 30,
    2: 45,
    3: 60,
    4: 70,
    5: 80,
    6: 85,
    7: 90,
    8: 100,
    9: 100,
    10: 100
  };
  const qeCoverage = qeCoverageMap[currentSprint] || 0;
  
  const qaProdVal = document.getElementById('qa-stat-prod-size');
  const qaProdDetails = document.getElementById('qa-stat-prod-details');
  const qaBarNew = document.getElementById('qa-prod-bar-new');
  const qaBarReg = document.getElementById('qa-prod-bar-reg');
  if (qaProdVal) qaProdVal.textContent = totalQAWork;
  if (qaProdDetails) qaProdDetails.innerHTML = `New: <span style="color:#fff">${config.built}</span> | Reg: <span style="color:#fff">${qaReg}</span>`;
  if (qaBarNew) qaBarNew.style.width = `${(config.built / 80) * 100}%`;
  if (qaBarReg) qaBarReg.style.width = `${(qaReg / 80) * 100}%`;
  
  const qaCoverageVal = document.getElementById('qa-stat-coverage');
  const qaCovBar = document.getElementById('qa-cov-bar');
  if (qaCoverageVal) {
    qaCoverageVal.textContent = `${qaCoverage}%`;
    let color = 'var(--accent-green)';
    if (qaCoverage < 20) color = 'var(--accent-red)';
    else if (qaCoverage < 50) color = 'var(--accent-warning)';
    qaCoverageVal.style.color = color;
    if (qaCovBar) {
      qaCovBar.style.width = `${qaCoverage}%`;
      qaCovBar.style.background = color;
    }
  }
  
  const qeProdVal = document.getElementById('qe-stat-prod-size');
  const qeProdDetails = document.getElementById('qe-stat-prod-details');
  const qeBarNew = document.getElementById('qe-prod-bar-new');
  const qeBarReg = document.getElementById('qe-prod-bar-reg');
  const totalQEWork = config.built + qeReg;
  if (qeProdVal) qeProdVal.textContent = totalQEWork;
  if (qeProdDetails) qeProdDetails.innerHTML = `New: <span style="color:#fff">${config.built}</span> | Reg: <span style="color:#fff">${qeReg}</span>`;
  if (qeBarNew) qeBarNew.style.width = `${(config.built / 80) * 100}%`;
  if (qeBarReg) qeBarReg.style.width = `${(qeReg / 80) * 100}%`;
  
  const qeCoverageVal = document.getElementById('qe-stat-coverage');
  const qeCovBar = document.getElementById('qe-cov-bar');
  if (qeCoverageVal) {
    qeCoverageVal.textContent = `${qeCoverage}%`;
    let color = qeCoverage >= 80 ? 'var(--accent-green)' : 'var(--accent-color)';
    qeCoverageVal.style.color = color;
    if (qeCovBar) {
      qeCovBar.style.width = `${qeCoverage}%`;
      qeCovBar.style.background = color;
    }
  }
}

function updateAutomatedTests(totalRequired, automatedCount) {
  const grid = document.getElementById('qe-test-suite-grid');
  const label = document.getElementById('qe-test-suite-label');
  if (label) {
    label.innerHTML = `Automated Test Suite <span style="color:var(--text-muted); font-size:0.75rem; font-weight:normal;">(${automatedCount} / ${totalRequired} covered)</span>`;
  }
  if (!grid) return;
  
  const currentCount = grid.children.length;
  
  if (totalRequired > currentCount) {
    const diff = totalRequired - currentCount;
    for (let i = 0; i < diff; i++) {
      const node = document.createElement('div');
      node.className = 'test-node pending';
      grid.appendChild(node);
      
      gsap.to(node, {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        delay: i * 0.03,
        ease: "back.out(2)"
      });
    }
  }
  
  Array.from(grid.children).forEach((node, index) => {
    if (index < automatedCount) {
      if (node.classList.contains('pending')) {
         node.classList.remove('pending');
         node.classList.add('automated');
         gsap.fromTo(node, { scale: 0.5 }, { scale: 1, duration: 0.3, ease: "back.out(2)" });
      }
    } else {
      node.classList.remove('automated');
      node.classList.add('pending');
    }
  });
}

function resetAutomatedTests() {
  const grid = document.getElementById('qe-test-suite-grid');
  const label = document.getElementById('qe-test-suite-label');
  if (label) {
    label.innerHTML = `Automated Test Suite <span style="color:var(--text-muted); font-size:0.75rem; font-weight:normal;">(0 / 0 covered)</span>`;
  }
  if (grid) grid.innerHTML = '';
}

function playSimulation() {
  isPlaying = true;
  btnPlaySprint.textContent = 'Pause';
  btnPlaySprint.classList.add('active-btn');
  
  playInterval = setInterval(() => {
    if (currentSprint < maxSprints) {
      runSprint(currentSprint + 1);
    } else {
      resetSimulation();
      runSprint(1);
    }
  }, 3500);
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
  
  stats = {
    qa: { built: 0, verified: 0, escaped: 0, rejected: 0 },
    qe: { built: 0, verified: 0, escaped: 0, rejected: 0 }
  };
  animateCounters();
  
  const qaProdVal = document.getElementById('qa-stat-prod-size');
  const qaProdDetails = document.getElementById('qa-stat-prod-details');
  const qaCoverageVal = document.getElementById('qa-stat-coverage');
  const qaBarNew = document.getElementById('qa-prod-bar-new');
  const qaBarReg = document.getElementById('qa-prod-bar-reg');
  const qaCovBar = document.getElementById('qa-cov-bar');
  
  if (qaProdVal) qaProdVal.textContent = '0';
  if (qaProdDetails) qaProdDetails.innerHTML = 'New: 0 | Reg: 0';
  if (qaBarNew) qaBarNew.style.width = '0%';
  if (qaBarReg) qaBarReg.style.width = '0%';
  if (qaCoverageVal) {
    qaCoverageVal.textContent = '100%';
    qaCoverageVal.style.color = 'var(--accent-green)';
  }
  if (qaCovBar) {
    qaCovBar.style.width = '100%';
    qaCovBar.style.background = 'var(--accent-green)';
  }
  
  const qeProdVal = document.getElementById('qe-stat-prod-size');
  const qeProdDetails = document.getElementById('qe-stat-prod-details');
  const qeCoverageVal = document.getElementById('qe-stat-coverage');
  const qeBarNew = document.getElementById('qe-prod-bar-new');
  const qeBarReg = document.getElementById('qe-prod-bar-reg');
  const qeCovBar = document.getElementById('qe-cov-bar');
  
  if (qeProdVal) qeProdVal.textContent = '0';
  if (qeProdDetails) qeProdDetails.innerHTML = 'New: 0 | Reg: 0';
  if (qeBarNew) qeBarNew.style.width = '0%';
  if (qeBarReg) qeBarReg.style.width = '0%';
  if (qeCoverageVal) {
    qeCoverageVal.textContent = '0%';
    qeCoverageVal.style.color = 'var(--accent-color)';
  }
  if (qeCovBar) {
    qeCovBar.style.width = '0%';
    qeCovBar.style.background = 'var(--accent-color)';
  }
  
  qaExplanation.textContent = 'Press "Next Sprint" to start development and testing simulation.';
  qeExplanation.textContent = 'Press "Next Sprint" to start development and testing simulation.';
  
  activeSimBlocks.forEach(b => { if (b.parentNode) b.remove() });
  activeSimBlocks = [];
  
  document.querySelectorAll('.product-pile').forEach(p => p.innerHTML = '');
  resetAutomatedTests();
}

function startSimulation() {
  if (simRunning) return;
  simRunning = true;
  if (isTimedMode) playSimulation();
}

function stopSimulation() {
  simRunning = false;
  pauseSimulation();
  resetSimulation();
}

// Generate slide navigation bar buttons
const slideNavBar = document.getElementById('slide-nav-bar');
if (slideNavBar) {
  slides.forEach((_, index) => {
    const btn = document.createElement('button');
    btn.className = 'slide-nav-btn';
    btn.textContent = index + 1;
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentSlideIndex = index;
      updateSlides();
    });
    slideNavBar.appendChild(btn);
  });
}

updateSlides();
