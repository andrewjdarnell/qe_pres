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
    startAnimation();
  } else {
    stopAnimation();
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
  } else if (e.key === 'ArrowLeft') {
    prevSlide();
  }
});

// Click Navigation (Left half goes prev, Right half goes next)
document.addEventListener('click', (e) => {
  // Ignore clicks on buttons inside the presentation
  if (e.target.tagName.toLowerCase() === 'button') return;
  
  const width = window.innerWidth;
  if (e.clientX > width / 2) {
    nextSlide();
  } else {
    prevSlide();
  }
});


// ---------------------------------------------------------
// Interactive Visualization Logic (Slide 5/6)
// ---------------------------------------------------------

const btnQa = document.getElementById('btn-qa');
const btnQe = document.getElementById('btn-qe');
const beltRows = [
  document.getElementById('belt-1'),
  document.getElementById('belt-2'),
  document.getElementById('belt-3')
];
const processors = document.querySelectorAll('.processor-station');
const descText = document.getElementById('animation-desc');

let isQEMode = false;
let animationRunning = false;
let spawnInterval;
let activeBlocks = [];

btnQa.addEventListener('click', () => setMode(false));
btnQe.addEventListener('click', () => setMode(true));

function setMode(qeMode) {
  isQEMode = qeMode;
  
  // Update Buttons
  btnQa.classList.toggle('active-btn', !isQEMode);
  btnQe.classList.toggle('active-btn', isQEMode);
  
  // Update UI Elements
  processors.forEach(p => {
    if (isQEMode) {
      p.classList.add('qe-mode');
      p.textContent = '🤖'; // Automation node
    } else {
      p.classList.remove('qe-mode');
      p.textContent = '🕵️'; // Manual tester
    }
  });

  // In QA mode, only 1 belt runs. In QE mode, all belts run in parallel
  beltRows[1].style.display = isQEMode ? 'flex' : 'none';
  beltRows[2].style.display = isQEMode ? 'flex' : 'none';

  // Update Description
  if (isQEMode) {
    descText.innerHTML = "<strong>The Solution:</strong> Test Engineers build automation machines alongside the pipeline. As code volume grows, automation scales instantly. Testing capacity matches development pace without burning out the team.";
  } else {
    descText.innerHTML = "<strong>The Problem:</strong> A fixed number of manual testers trying to keep up. As code volume grows, the testing queue overflows. Testing becomes a bottleneck and teams are forced into 'risk-based testing.'";
  }
  
  // Clear existing blocks to reset the visual state cleanly
  clearBlocks();
}

function spawnBlock() {
  if (!animationRunning) return;
  
  // Determine which belts are active
  const activeBelts = isQEMode ? beltRows : [beltRows[0]];
  
  activeBelts.forEach((belt, index) => {
    // Random chance to spawn on a belt tick to simulate uneven developer output
    if (Math.random() > 0.6) return;

    const block = document.createElement('div');
    block.className = 'code-block';
    block.textContent = '{ }';
    
    // Starting position
    block.style.transform = `translateX(0px)`;
    belt.appendChild(block);
    
    activeBlocks.push({
      el: block,
      pos: 0,
      beltIndex: index,
      state: 'moving' // moving, queued, processing, processed
    });
  });
}

function updateAnimation() {
  if (!animationRunning) return;
  
  // Speed settings
  const moveSpeed = 3; // Pixels per frame
  const beltLength = 600; // Approximate pixel distance to processor
  const processingPos = 450; // Where blocks hit the processor or queue
  
  // Count blocks queued at each belt
  let queuedCounts = [0, 0, 0];
  
  activeBlocks.forEach(blockData => {
    if (blockData.state === 'processed') return;

    if (blockData.state === 'moving') {
      blockData.pos += moveSpeed;
      blockData.el.style.transform = `translateX(${blockData.pos}px)`;
      
      // Calculate queue position based on how many are currently queued on this belt
      const queuePosition = processingPos - (queuedCounts[blockData.beltIndex] * 45);
      
      if (blockData.pos >= queuePosition) {
        if (isQEMode) {
          // QE Mode: Process instantly
          blockData.state = 'processed';
          blockData.el.classList.add('processed');
          setTimeout(() => {
            if(blockData.el.parentNode) blockData.el.parentNode.removeChild(blockData.el);
          }, 500);
        } else {
          // QA Mode: Queue up
          blockData.state = 'queued';
          blockData.el.classList.add('queued');
          queuedCounts[blockData.beltIndex]++;
        }
      }
    } else if (blockData.state === 'queued') {
       queuedCounts[blockData.beltIndex]++;
       // Slowly process 1 block from the queue occasionally
       if (Math.random() > 0.98) {
          blockData.state = 'processed';
          blockData.el.classList.remove('queued');
          blockData.el.classList.add('processed');
          setTimeout(() => {
            if(blockData.el.parentNode) blockData.el.parentNode.removeChild(blockData.el);
          }, 500);
       }
    }
  });

  // Filter out processed blocks
  activeBlocks = activeBlocks.filter(b => b.state !== 'processed');

  requestAnimationFrame(updateAnimation);
}

function clearBlocks() {
  activeBlocks.forEach(b => {
    if(b.el.parentNode) b.el.parentNode.removeChild(b.el);
  });
  activeBlocks = [];
}

function startAnimation() {
  if (animationRunning) return;
  animationRunning = true;
  setMode(isQEMode); // Apply current state
  spawnInterval = setInterval(spawnBlock, 400); // Spawn check every 400ms
  requestAnimationFrame(updateAnimation);
}

function stopAnimation() {
  animationRunning = false;
  clearInterval(spawnInterval);
}

// Initial Setup
updateSlides();
