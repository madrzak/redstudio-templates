// Generate grass elements
function initGrass() {
    const grassContainer = document.querySelector('.grass-container');
    const grassCount = 100; // Number of grass elements

    for (let i = 0; i < grassCount; i++) {
        const grass = document.createElement('div');
        grass.className = 'grass';
        
        // Randomly choose which side the grass will grow from
        const side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
        
        switch(side) {
            case 0: // Top
                grass.style.top = '0';
                grass.style.left = `${Math.random() * 100}%`;
                grass.style.transform = 'rotate(180deg)';
                break;
            case 1: // Right
                grass.style.right = '0';
                grass.style.top = `${Math.random() * 100}%`;
                grass.style.transform = 'rotate(270deg)';
                break;
            case 2: // Bottom
                grass.style.bottom = '0';
                grass.style.left = `${Math.random() * 100}%`;
                break;
            case 3: // Left
                grass.style.left = '0';
                grass.style.top = `${Math.random() * 100}%`;
                grass.style.transform = 'rotate(90deg)';
                break;
        }

        grass.style.animationDelay = `${Math.random() * 2}s`;
        grassContainer.appendChild(grass);
    }
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', initGrass); 