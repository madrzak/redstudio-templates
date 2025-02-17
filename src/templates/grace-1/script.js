// Array of leaf image URLs - you should replace these with actual leaf image URLs
const leafImages = [
    'assets/leaf.svg',
];

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
    // Distribute bunches evenly with some randomness
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
        
        // Rotation and scale variations
        const baseRotation = -30 + Math.random() * 60; // -30 to 30 degrees
        const scaleX = 0.7 + Math.random() * 0.6; // Scale between 0.7 and 1.3
        const scaleY = 0.9 + Math.random() * 0.2; // Slight height variation
        blade.style.transform = `
            rotate(${baseRotation}deg) 
            scaleX(${scaleX})
            scaleY(${scaleY})
        `;
        
        // Animation variations
        blade.style.animationDelay = `${Math.random() * 2}s`;
        blade.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        // Add some blades behind others for depth
        blade.style.zIndex = Math.floor(Math.random() * 3);
        
        bunch.appendChild(blade);
    }
    
    container.appendChild(bunch);
}

function addLeaf(container) {
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    
    // Randomly select a leaf image
    const leafImage = leafImages[Math.floor(Math.random() * leafImages.length)];
    leaf.style.backgroundImage = `url(${leafImage})`;

    const side = Math.floor(Math.random() * 4);
    const size = 20 + Math.random() * 20; // Random size between 20px and 40px
    
    leaf.style.width = `${size}px`;
    leaf.style.height = `${size}px`;
    
    switch(side) {
        case 0: // Top
            leaf.style.top = '-20px';
            leaf.style.left = `${Math.random() * 100}%`;
            break;
        case 1: // Right
            leaf.style.right = '-20px';
            leaf.style.top = `${Math.random() * 100}%`;
            break;
        case 2: // Bottom
            leaf.style.bottom = '-20px';
            leaf.style.left = `${Math.random() * 100}%`;
            break;
        case 3: // Left
            leaf.style.left = '-20px';
            leaf.style.top = `${Math.random() * 100}%`;
            break;
    }

    leaf.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(leaf);
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initGrass); 