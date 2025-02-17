// Animation speed control - lower = faster, higher = slower
const ANIMATION_SPEED = 5;

// Array of grass blade variations
const GRASS_TYPES = [
    'assets/grass.svg',      // Original grass
    // 'assets/grass-thin.svg', // Thinner variant
    'assets/grass-wide.svg'  // Wider variant
];

function initGrass() {
    const container = document.querySelector('.grass-container');
    const bunchCount = 10;

    // Make container interactive but keep original style
    container.style.cssText = `
        position: relative;
        width: 100%;
        pointer-events: all;
    `;
    
    // Add test dot
    const testDot = document.createElement('div');
    testDot.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: red;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
    `;
    container.appendChild(testDot);
    
    // Add multiple event listeners to debug
    ['mousemove', 'pointermove'].forEach(eventType => {
        container.addEventListener(eventType, (e) => {
            console.log(`${eventType} detected:`, e.clientX, e.clientY);
            
            const rect = container.getBoundingClientRect();
            console.log('Container bounds:', rect.left, rect.top, rect.width, rect.height);
            
            testDot.style.left = (e.clientX - rect.left) + 'px';
            testDot.style.top = (e.clientY - rect.top) + 'px';
            
            handleMouseMove(e);
        });
    });

    // Also try document-level event listening
    document.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        if (e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom) {
            console.log('Mouse over container area!');
        }
    });

    for (let i = 0; i < bunchCount; i++) {
        addGrassBunch(container, i, bunchCount);
    }
}

function addGrassBunch(container, index, totalBunches) {
    const bunch = document.createElement('div');
    bunch.className = 'grass-bunch';
    
    const bladesInBunch = 8 + Math.floor(Math.random() * 5);
    
    // Return to original positioning but keep absolute
    bunch.style.position = 'absolute';
    bunch.style.bottom = '-20px';  // Original bottom position
    const position = (index / totalBunches) * 100 + (Math.random() * 8 - 4);
    bunch.style.left = `${position}%`;
    bunch.style.transformOrigin = 'top center';  // Back to original top center
    
    // Create blades with varying properties for realism
    for (let i = 0; i < bladesInBunch; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass';
        
        // Randomly select grass type
        const grassType = GRASS_TYPES[Math.floor(Math.random() * GRASS_TYPES.length)];
        blade.style.backgroundImage = `url(${grassType})`;
        blade.style.backgroundSize = 'contain';
        blade.style.backgroundRepeat = 'no-repeat';
        
        // Adjust size based on grass type
        const isWide = grassType.includes('wide');
        const isThin = grassType.includes('thin');
        
        // Vary the size with different ranges for each type
        const heightVariation = 80 + Math.random() * (isWide ? 80 : isThin ? 140 : 120);
        const widthVariation = isWide ? (12 + Math.random() * 8) : 
                              isThin ? (6 + Math.random() * 4) : 
                              (8 + Math.random() * 8);
        
        blade.style.height = `${heightVariation}px`;
        blade.style.width = `${widthVariation}px`;
        
        // Position within bunch - create a natural spread
        const spreadX = -25 + Math.random() * 50;
        const spreadY = Math.random() * 15;
        blade.style.left = `${spreadX}px`;
        blade.style.bottom = `${spreadY}px`;
        
        // Advanced animation variations
        const animationType = Math.floor(Math.random() * 3);
        const baseDelay = Math.random() * 2 * ANIMATION_SPEED;
        const baseDuration = (2 + Math.random() * 2) * ANIMATION_SPEED;
        
        // Adjust animation properties based on grass type
        const swayAngle = isThin ? (-20 + Math.random() * 15) :
                         isWide ? (-10 + Math.random() * 8) :
                         (-15 + Math.random() * 10);
        
        blade.style.setProperty('--sway-angle', `${swayAngle}deg`);
        blade.style.setProperty('--sway-duration', `${baseDuration}s`);
        blade.style.setProperty('--sway-delay', `${baseDelay}s`);
        
        // Assign different animation patterns
        switch(animationType) {
            case 0:
                blade.classList.add('sway-gentle');
                break;
            case 1:
                blade.classList.add('sway-wide');
                break;
            case 2:
                blade.classList.add('sway-erratic');
                break;
        }
        
        // Rotation and scale variations adjusted for type
        const baseRotation = -30 + Math.random() * 60;
        const scaleX = isWide ? (0.8 + Math.random() * 0.4) :
                      isThin ? (0.6 + Math.random() * 0.4) :
                      (0.7 + Math.random() * 0.6);
        const scaleY = 0.9 + Math.random() * 0.2;
        
        // Add data attributes for mouse interaction
        blade.dataset.baseRotation = baseRotation;
        blade.dataset.mouseInfluence = 0;
        
        // Add transition for mouse movement
        blade.style.transition = 'transform 0.1s ease-out'; // Faster transition
        
        // Store initial transform values
        blade.dataset.baseRotation = baseRotation;
        blade.dataset.scaleX = scaleX;
        blade.dataset.scaleY = scaleY;
        
        blade.style.transform = `
            rotate(${baseRotation}deg) 
            scaleX(${scaleX})
            scaleY(${scaleY})
        `;
        
        blade.style.zIndex = Math.floor(Math.random() * 3);
        
        bunch.appendChild(blade);
    }
    
    container.appendChild(bunch);
}

// Update handleMouseMove to be more aggressive
function handleMouseMove(e) {
    const container = document.querySelector('.grass-container');
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;
    
    console.log('Processing mouse move at:', mouseX, mouseY);
    
    const blades = document.querySelectorAll('.grass');
    
    blades.forEach(blade => {
        const bladeRect = blade.getBoundingClientRect();
        const bladeCenterX = bladeRect.left + bladeRect.width / 2 - containerRect.left;
        const bladeCenterY = bladeRect.top + bladeRect.height / 2 - containerRect.top;
        
        const dx = mouseX - bladeCenterX;
        const dy = mouseY - bladeCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Stronger effect with larger range
        if (distance < 300) {  // Much larger range
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const baseRotation = parseFloat(blade.dataset.baseRotation);
            
            // Stronger influence that pushes away from mouse
            const influence = Math.pow(1 - distance / 300, 0.3) * 180; // Much stronger effect
            const pushDirection = angle + 180; // Point away from mouse
            const newRotation = baseRotation + (influence * Math.sign(Math.sin((pushDirection - baseRotation) * Math.PI / 180)));
            
            console.log(`Blade at ${Math.round(distance)}px: rotation=${Math.round(newRotation)}°`);
            
            blade.style.transform = `
                rotate(${newRotation}deg)
                scaleX(${blade.dataset.scaleX})
                scaleY(${blade.dataset.scaleY})
            `;
        } else {
            // Return to base position
            blade.style.transform = `
                rotate(${blade.dataset.baseRotation}deg)
                scaleX(${blade.dataset.scaleX})
                scaleY(${blade.dataset.scaleY})
            `;
        }
    });
}

// Initialize only once when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initGrass();
}); 