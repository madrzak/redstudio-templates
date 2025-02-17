// Array of leaf image URLs - you should replace these with actual leaf image URLs
const leafImages = [
    'assets/leaf.svg',
];

function initGreenery() {
    const container = document.querySelector('.grass-container');
    const bunchCount = 40; // Reduced count since each bunch contains multiple grass blades
    const leafCount = 30;

    // Add grass bunches
    for (let i = 0; i < bunchCount; i++) {
        addGrassBunch(container);
    }

    // Add leaves
    for (let i = 0; i < leafCount; i++) {
        addLeaf(container);
    }
}

function addGrassBunch(container) {
    const bunch = document.createElement('div');
    bunch.className = 'grass-bunch';
    
    const side = Math.floor(Math.random() * 4);
    const bladesInBunch = 5 + Math.floor(Math.random() * 4); // 5-8 blades per bunch
    
    // Position the bunch
    switch(side) {
        case 0: // Top
            bunch.style.top = '-20px'; // Move slightly outside container
            bunch.style.left = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'bottom center';
            bunch.style.transform = 'rotate(180deg)';
            break;
        case 1: // Right
            bunch.style.right = '-20px'; // Move slightly outside container
            bunch.style.top = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'left center';
            bunch.style.transform = 'rotate(270deg)';
            break;
        case 2: // Bottom
            bunch.style.bottom = '-20px'; // Move slightly outside container
            bunch.style.left = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'top center';
            break;
        case 3: // Left
            bunch.style.left = '-20px'; // Move slightly outside container
            bunch.style.top = `${Math.random() * 100}%`;
            bunch.style.transformOrigin = 'right center';
            bunch.style.transform = 'rotate(90deg)';
            break;
    }

    // Add individual grass blades to the bunch
    for (let i = 0; i < bladesInBunch; i++) {
        const grass = document.createElement('div');
        grass.className = 'grass';
        grass.style.backgroundImage = 'url(assets/grass.svg)';
        grass.style.backgroundSize = 'contain';
        grass.style.backgroundRepeat = 'no-repeat';
        
        // Vary the size and position within the bunch
        const height = 60 + Math.random() * 100;
        grass.style.height = `${height}px`;
        grass.style.width = '12px';
        
        // Position within bunch - adjusted spread
        grass.style.left = `${-15 + Math.random() * 30}px`; // Wider spread horizontally
        grass.style.transform = `rotate(${-20 + Math.random() * 40}deg) scaleX(${0.8 + Math.random() * 0.4})`; // More rotation variation
        
        // Randomize animation
        grass.style.animationDelay = `${Math.random() * 2}s`;
        grass.style.animationDuration = `${2 + Math.random() * 2}s`;
        
        bunch.appendChild(grass);
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
document.addEventListener('DOMContentLoaded', initGreenery); 