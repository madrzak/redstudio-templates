// Animation speed control - lower = faster, higher = slower
const ANIMATION_SPEED = 5;

// Array of grass blade variations
const GRASS_TYPES = [
    'assets/grass.svg',      // Original grass
    'assets/grass-wide.svg'  // Wider variant
];

function initGrass() {
    const container = document.querySelector('.grass-container');
    const bunchCount = 50;

    container.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 200px;
        pointer-events: all;
    `;

    container.addEventListener('mousemove', handleMouseMove);

    let grassBunches = [];

    for (let i = 0; i < bunchCount; i++) {
        const bunch = addGrassBunch(i, bunchCount);
        grassBunches.push(bunch);
    }

    // Sort bunches based on their visual position (bottom-most ones should be in front)
    grassBunches.sort((a, b) => {
        return parseFloat(a.dataset.zIndex) - parseFloat(b.dataset.zIndex);
    });

    // Append in sorted order
    grassBunches.forEach(bunch => container.appendChild(bunch));
}

function addGrassBunch(index, totalBunches) {
    const bunch = document.createElement('div');
    bunch.className = 'grass-bunch';

    const bladesInBunch = 8 + Math.floor(Math.random() * 5);
    bunch.style.position = 'absolute';
    bunch.style.bottom = '-20px';
    const position = (index / totalBunches) * 100 + (Math.random() * 8 - 4);
    bunch.style.left = `${position}%`;
    bunch.style.transformOrigin = 'top center';

    let minBladeBottom = Number.MAX_VALUE;

    for (let i = 0; i < bladesInBunch; i++) {
        const blade = document.createElement('div');
        blade.className = 'grass';

        const grassType = GRASS_TYPES[Math.floor(Math.random() * GRASS_TYPES.length)];
        blade.style.backgroundImage = `url(${grassType})`;
        blade.style.backgroundSize = 'contain';
        blade.style.backgroundRepeat = 'no-repeat';

        const isWide = grassType.includes('wide');

        const heightVariation = 80 + Math.random() * (isWide ? 80 : 120);
        const widthVariation = isWide ? (12 + Math.random() * 8) : (8 + Math.random() * 8);

        blade.style.height = `${heightVariation}px`;
        blade.style.width = `${widthVariation}px`;

        // Position within bunch
        const spreadX = -25 + Math.random() * 50;
        const spreadY = Math.random() * 15;
        blade.style.position = 'absolute';
        blade.style.left = `${spreadX}px`;
        blade.style.bottom = `${spreadY}px`;
        blade.style.transformOrigin = 'bottom center';

        // Track lowest bottom value (indicates foreground position)
        minBladeBottom = Math.min(minBladeBottom, spreadY);

        // Animation variations
        const animationType = Math.floor(Math.random() * 3);
        const baseDelay = Math.random() * 2 * ANIMATION_SPEED;
        const baseDuration = (2 + Math.random() * 2) * ANIMATION_SPEED;

        const swayAngle = isWide ? (-10 + Math.random() * 8) : (-15 + Math.random() * 10);
        blade.style.setProperty('--sway-angle', `${swayAngle}deg`);
        blade.style.setProperty('--sway-duration', `${baseDuration}s`);
        blade.style.setProperty('--sway-delay', `${baseDelay}s`);

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

        const baseRotation = -30 + Math.random() * 60;
        const scaleX = isWide ? (0.8 + Math.random() * 0.4) : (0.7 + Math.random() * 0.6);
        const scaleY = 0.9 + Math.random() * 0.2;

        blade.dataset.baseRotation = baseRotation;
        blade.dataset.scaleX = scaleX;
        blade.dataset.scaleY = scaleY;

        blade.style.transform = `
            rotate(${baseRotation}deg) 
            scaleX(${scaleX})
            scaleY(${scaleY})
        `;

        bunch.appendChild(blade);
    }

    // Updated z-index logic: the lower the grass, the higher the z-index
    const zIndexBase = 1000;
    bunch.style.zIndex = Math.floor(zIndexBase - minBladeBottom);
    bunch.dataset.zIndex = bunch.style.zIndex;

    return bunch;
}

function handleMouseMove(e) {
    const container = document.querySelector('.grass-container');
    const containerRect = container.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const mouseY = e.clientY - containerRect.top;

    const blades = document.querySelectorAll('.grass');

    blades.forEach(blade => {
        const bladeRect = blade.getBoundingClientRect();
        const bladeCenterX = bladeRect.left + bladeRect.width / 2 - containerRect.left;
        const bladeCenterY = bladeRect.top + bladeRect.height / 2 - containerRect.top;

        const dx = mouseX - bladeCenterX;
        const dy = mouseY - bladeCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) { 
            const angle = Math.atan2(dy, dx) * 180 / Math.PI;
            const baseRotation = parseFloat(blade.dataset.baseRotation);

            const influence = Math.pow(1 - distance / 100, 2) * 25;
            const bendDirection = angle + 180;
            const newRotation = baseRotation + (influence * Math.cos((bendDirection - baseRotation) * Math.PI / 180));

            const bendScale = 1 - (influence / 200);
            const scaleX = parseFloat(blade.dataset.scaleX);
            const scaleY = parseFloat(blade.dataset.scaleY) * bendScale;

            blade.style.transform = `
                rotate(${newRotation}deg)
                scaleX(${scaleX})
                scaleY(${scaleY})
            `;
        } else {
            blade.style.transform = `
                rotate(${blade.dataset.baseRotation}deg)
                scaleX(${blade.dataset.scaleX})
                scaleY(${blade.dataset.scaleY})
            `;
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    initGrass();
});
