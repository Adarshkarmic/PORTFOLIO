import * as THREE from 'three';
import * as CANNON from 'cannon-es';

// Setup Three.js
const container = document.getElementById('dna-canvas-container');
const canvas = document.getElementById('dna-canvas');

const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);

const scene = new THREE.Scene();

// Camera setup (Using Perspective to see depth easily)
const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(10, 20, 10);
scene.add(dirLight);

const spotLight = new THREE.SpotLight(0x00d084, 2);
spotLight.position.set(-10, 10, -5);
scene.add(spotLight);

// Setup Cannon.js
const world = new CANNON.World({
    gravity: new CANNON.Vec3(0, -20, 0)
});

// Materials
const physicsMaterial = new CANNON.Material('standard');
const contactMaterial = new CANNON.ContactMaterial(physicsMaterial, physicsMaterial, {
    friction: 0.2,
    restitution: 0.7 // Bounciness
});
world.addContactMaterial(contactMaterial);

// Boundaries
const boundsMaterial = new CANNON.Material('bounds');
const boundsContact = new CANNON.ContactMaterial(physicsMaterial, boundsMaterial, {
    friction: 0.1,
    restitution: 0.8
});
world.addContactMaterial(boundsContact);

function createWall(x, y, z, width, height, depth) {
    const shape = new CANNON.Box(new CANNON.Vec3(width/2, height/2, depth/2));
    const body = new CANNON.Body({ mass: 0, material: boundsMaterial });
    body.addShape(shape);
    body.position.set(x, y, z);
    world.addBody(body);
}

// Floor, ceiling, left, right, front, back
createWall(0, -7, 0, 40, 1, 10); // Floor
createWall(0, 25, 0, 40, 1, 10);  // Ceiling
createWall(-12, 5, 0, 1, 30, 10); // Left
createWall(12, 5, 0, 1, 30, 10);  // Right
createWall(0, 5, 5, 40, 30, 1);   // Front (glass)
createWall(0, 5, -5, 40, 30, 1);  // Back

// Skill Blocks
const skills = ["Figma", "React", "Next.js", "Three.js", "GSAP", "Framer", "Spline", "Tailwind"];
const blocks = [];

// Helper to create a texture with text
function createTextTexture(text) {
    const cvs = document.createElement('canvas');
    cvs.width = 512;
    cvs.height = 128;
    const ctx = cvs.getContext('2d');
    
    // Background (Dark Charcoal)
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    
    // Text
    ctx.font = 'bold 48px Inter, sans-serif';
    ctx.fillStyle = '#00d084';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, cvs.width / 2, cvs.height / 2);
    
    const tex = new THREE.CanvasTexture(cvs);
    // Helps avoid blurriness
    tex.generateMipmaps = false;
    tex.minFilter = THREE.LinearFilter;
    return tex;
}

const boxWidth = 5;
const boxHeight = 1.5;
const boxDepth = 1.5;

// Geometries (using standard box for performance, looks clean)
const boxGeo = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

skills.forEach((skill, i) => {
    // Texture
    const texture = createTextTexture(skill);
    
    // Materials for the 6 faces
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6, metalness: 0.2 });
    const textMat = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0.2 });
    
    const materials = [
        darkMat, // right
        darkMat, // left
        darkMat, // top
        darkMat, // bottom
        textMat, // front
        textMat  // back 
    ];

    // Three.js Mesh
    const mesh = new THREE.Mesh(boxGeo, materials);
    scene.add(mesh);

    // Cannon.js Body
    const shape = new CANNON.Box(new CANNON.Vec3(boxWidth/2, boxHeight/2, boxDepth/2));
    const body = new CANNON.Body({
        mass: 1,
        material: physicsMaterial,
        position: new CANNON.Vec3((Math.random() - 0.5) * 10, 10 + i * 3, (Math.random() - 0.5) * 2)
    });
    body.addShape(shape);
    
    // Add random slight rotation so they tumble nicely
    body.quaternion.setFromEuler(
        (Math.random() - 0.5) * Math.PI, 
        (Math.random() - 0.5) * Math.PI, 
        (Math.random() - 0.5) * Math.PI
    );
    
    world.addBody(body);

    blocks.push({ mesh, body });
});

// Raycaster for interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

container.addEventListener('mousedown', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const meshes = blocks.map(b => b.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
        // Find which block was clicked
        const clickedMesh = intersects[0].object;
        const block = blocks.find(b => b.mesh === clickedMesh);
        if (block) {
            // Apply impulse to pop it up
            block.body.applyImpulse(
                new CANNON.Vec3((Math.random() - 0.5) * 20, 50, (Math.random() - 0.5) * 20),
                new CANNON.Vec3(0, 0, 0)
            );
            // Apply torque to spin it
            block.body.applyTorque(
                new CANNON.Vec3((Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100, (Math.random() - 0.5) * 100)
            );
        }
    }
});

// Cursor styles
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(blocks.map(b => b.mesh));
    
    if(intersects.length > 0) {
        container.style.cursor = 'pointer';
    } else {
        container.style.cursor = 'default';
    }
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const dt = clock.getDelta();
    // Step the physics world
    world.step(1 / 60, dt, 3);

    // Sync meshes with bodies
    blocks.forEach(b => {
        b.mesh.position.copy(b.body.position);
        b.mesh.quaternion.copy(b.body.quaternion);
    });

    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    if(!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
