import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { planetData } from './planetData.js';

// Scene Setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 20;
controls.maxDistance = 500;

// Lighting
const ambientLight = new THREE.AmbientLight(0xaaaaaa, 1.5); // Increased intensity and brighter color
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 3, 400); // Increased intensity and distance
scene.add(pointLight);

// Starfield Background
function createStars() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    for (let i = 0; i < 10000; i++) {
        vertices.push(
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000),
            THREE.MathUtils.randFloatSpread(2000)
        );
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.7 });
    const stars = new THREE.Points(geometry, material);
    scene.add(stars);
}
createStars();

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Planets (including Sun)
const planets = [];
const planetMeshes = []; // For raycasting

function createPlanet(data) {
    const planetGroup = new THREE.Group();

    // Orbit path (skip for Sun)
    if (data.distance > 0) {
        const orbitGeometry = new THREE.RingGeometry(data.distance - 0.1, data.distance + 0.1, 64);
        const orbitMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.1
        });
        const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
        orbit.rotation.x = Math.PI / 2;
        scene.add(orbit);
    }

    // Planet/Sun Mesh
    const geometry = new THREE.SphereGeometry(data.radius, 64, 64);

    let material;
    if (data.texture) {
        material = new THREE.MeshStandardMaterial({
            map: textureLoader.load(data.texture),
            roughness: 0.5,
            metalness: 0.1,
            // Add emissive for Sun
            emissive: data.name === "Sun" ? 0xff8800 : 0x000000,
            emissiveIntensity: data.name === "Sun" ? 0.3 : 0
        });
    } else {
        material = new THREE.MeshStandardMaterial({
            color: data.color,
            roughness: 0.5,
            metalness: 0.2,
            emissive: data.color,
            emissiveIntensity: 0.2
        });
    }
    const mesh = new THREE.Mesh(geometry, material);
    mesh.userData = data; // Store data for click event

    // Initial position
    mesh.position.x = data.distance;

    planetGroup.add(mesh);

    // Rings (Saturn)
    if (data.hasRings) {
        const ringGeo = new THREE.RingGeometry(data.radius + 1, data.radius + 4, 32);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xffdd88,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.6
        });
        const ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = Math.PI / 2;
        mesh.add(ring);
    }

    scene.add(planetGroup);

    planets.push({
        mesh: mesh,
        group: planetGroup,
        data: data,
        angle: Math.random() * Math.PI * 2
    });

    planetMeshes.push(mesh);
}

planetData.forEach(createPlanet);

// Camera Position
camera.position.set(0, 50, 100);
controls.update();

// Raycaster for interaction
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
        const planet = intersects[0].object;
        showInfo(planet.userData);
    }
}

window.addEventListener('click', onMouseClick);

// UI Logic
const infoCard = document.getElementById('info-card');
const closeBtn = document.getElementById('close-btn');
const planetName = document.getElementById('planet-name');
const planetDesc = document.getElementById('planet-desc');
const planetDist = document.getElementById('planet-dist');

function showInfo(data) {
    planetName.textContent = data.name;
    planetDesc.textContent = data.description;
    planetDist.textContent = data.distance;
    infoCard.classList.add('visible');
}

closeBtn.addEventListener('click', () => {
    infoCard.classList.remove('visible');
});

// Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Animation Control
let isPaused = false;
const pauseBtn = document.getElementById('pause-btn');

pauseBtn.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Resume' : 'Pause';
});

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        // Animate Planets
        planets.forEach(planet => {
            // Orbit
            planet.angle += planet.data.speed;
            planet.mesh.position.x = Math.cos(planet.angle) * planet.data.distance;
            planet.mesh.position.z = Math.sin(planet.angle) * planet.data.distance;
        });
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();
