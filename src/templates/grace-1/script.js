// Array of leaf image URLs - you should replace these with actual leaf image URLs
const leafImages = [
    'assets/leaf.svg',
];

function initGrass() {
    const container = document.querySelector('.grass-container');
    const bunchCount = 40;

    // Add grass bunches around the container edges
    for (let i = 0; i < bunchCount; i++) {
        addGrassBunch(container);
    }
}

function addGrassBunch(container) {
    const bunch = document.createElement('div');
    bunch.className = 'grass-bunch';
    
    const side = Math.floor(Math.random() * 4);
    const bladesInBunch = 8 + Math.floor(Math.random() * 5); // 8-12 blades per bunch
    
    // Position the bunch
    switch(side) {
        case 0: // Top
            bunch.style.top = '-20px';
            bunch.style.left = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'bottom center';
            bunch.style.transform = 'rotate(180deg)';
            break;
        case 1: // Right
            bunch.style.right = '-20px';
            bunch.style.top = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'left center';
            bunch.style.transform = 'rotate(270deg)';
            break;
        case 2: // Bottom
            bunch.style.bottom = '-20px';
            bunch.style.left = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'top center';
            break;
        case 3: // Left
            bunch.style.left = '-20px';
            bunch.style.top = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'right center';
            bunch.style.transform = 'rotate(90deg)';
            break;
    }

    // Create blades with varying properties for realism
    for (let i = 0; i < bladesInBunch; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass';
        
        // Base properties
        blade.style.backgroundImage = 'url(assets/grass.svg)';
        blade.style.backgroundSize = 'contain';
        blade.style.backgroundRepeat = 'no-repeat';
        
        // Vary the size
        const heightVariation = 60 + Math.random() * 100; // Height between 60-160px
        const widthVariation = 8 + Math.random() * 8; // Width between 8-16px
        blade.style.height = `${heightVariation}px`;
        blade.style.width = `${widthVariation}px`;
        
        // Position within bunch - create a natural spread
        const spreadX = -20 + Math.random() * 40; // Wider spread
        const spreadY = Math.random() * 10; // Slight vertical variation
        blade.style.left = `${spreadX}px`;
        blade.style.bottom = `${spreadY}px`;
        
        // Rotation and scale variations
        const baseRotation = -25 + Math.random() * 50; // -25 to 25 degrees
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