// Animation speed control - lower = faster, higher = slower
const ANIMATION_SPEED = 1.0;

function initGrass() {
    const container = document.querySelector('.grass-container');
    const bunchCount = 25; // Increased density for bottom edge

    // Add grass bunches along bottom edge
    for (let i = 0; i < bunchCount; i++) {
        addGrassBunch(container, i, bunchCount);
    }
}

function addGrassBunch(container, index, totalBunches) {
    const bunch = document.createElement('div');
    bunch.className = 'grass-bunch';
    
    const bladesInBunch = 8 + Math.floor(Math.random() * 5); // 8-12 blades per bunch
    
    // Position along bottom edge
    bunch.style.bottom = '-20px';
    const position = (index / totalBunches) * 100 + (Math.random() * 8 - 4);
    bunch.style.left = `${position}%`;
    bunch.style.transformOrigin = 'top center';
    
    // Create blades with varying properties for realism
    for (let i = 0; i < bladesInBunch; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass';
        
        // Base properties
        blade.style.backgroundImage = 'url(assets/grass.svg)';
        blade.style.backgroundSize = 'contain';
        blade.style.backgroundRepeat = 'no-repeat';
        
        // Vary the size - taller grass for more impact
        const heightVariation = 80 + Math.random() * 120; // Height between 80-200px
        const widthVariation = 8 + Math.random() * 8; // Width between 8-16px
        blade.style.height = `${heightVariation}px`;
        blade.style.width = `${widthVariation}px`;
        
        // Position within bunch - create a natural spread
        const spreadX = -25 + Math.random() * 50; // Wider spread for bottom only
        const spreadY = Math.random() * 15; // Slight vertical variation
        blade.style.left = `${spreadX}px`;
        blade.style.bottom = `${spreadY}px`;
        
        // Advanced animation variations
        const animationType = Math.floor(Math.random() * 3); // 3 different animation patterns
        const baseDelay = Math.random() * 2 * ANIMATION_SPEED;
        const baseDuration = (2 + Math.random() * 2) * ANIMATION_SPEED;
        
        // Set custom properties for animation
        blade.style.setProperty('--sway-angle', `${-15 + Math.random() * 10}deg`);
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
        
        // Rotation and scale variations
        const baseRotation = -30 + Math.random() * 60;
        const scaleX = 0.7 + Math.random() * 0.6;
        const scaleY = 0.9 + Math.random() * 0.2;
        blade.style.transform = `
            rotate(${baseRotation}deg) 
            scaleX(${scaleX})
            scaleY(${scaleY})
        `;
        
        // Add some blades behind others for depth
        blade.style.zIndex = Math.floor(Math.random() * 3);
        
        bunch.appendChild(blade);
    }
    
    container.appendChild(bunch);
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initGrass); 