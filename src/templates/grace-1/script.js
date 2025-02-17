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
    const bunchCount = 25;

    for (let i = 0; i < bunchCount; i++) {
        addGrassBunch(container, i, bunchCount);
    }
}

function addGrassBunch(container, index, totalBunches) {
    const bunch = document.createElement('div');
    bunch.className = 'grass-bunch';
    
    const bladesInBunch = 8 + Math.floor(Math.random() * 5);
    
    bunch.style.bottom = '-20px';
    const position = (index / totalBunches) * 100 + (Math.random() * 8 - 4);
    bunch.style.left = `${position}%`;
    bunch.style.transformOrigin = 'top center';
    
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

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initGrass); 