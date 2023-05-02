import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';


const myText = document.getElementById("myText");


// Initialisez votre canevas WebGL
const canvas = document.getElementById('myCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// Créez une scène
const scene = new THREE.Scene();

// Chargez une police de caractères
const fontLoader = new FontLoader();
fontLoader.load('fonts/Magma DEMO_Regular.json', function (font) {
    // Créez une géométrie de texte
    const geometry = new TextGeometry(myText.innerHTML, {
        font: font,
        size: 80,
        height: 15,
        curveSegments: 12,
        bevelEnabled: false,
        bevelThickness: 10,
        bevelSize: 10,
        bevelSegments: 5,
    });

    // Créez un matériau de texte
    const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        shininess: 50,
    });

    const text = new THREE.Mesh(geometry, material);
    //placer le texte au milieu du canvas
    geometry.computeBoundingBox();
    const textWidth = geometry.boundingBox.max.x - geometry.boundingBox.min.x;
    const textHeight = geometry.boundingBox.max.y - geometry.boundingBox.min.y;
    text.position.set(-textWidth / 2, -textHeight / 2, 0);

    scene.add(text);

    const light = new THREE.DirectionalLight(0xffd401, 1);
    light.position.set(0, 0, 500);
    scene.add(light);

    // Positionnez la caméra pour voir le texte
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 500);

    // Redessinez le canevas WebGL
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    // Ajoutez une fonction de mise à jour pour faire onduler le texte
    function update() {
        requestAnimationFrame(update);
        renderer.render(scene, camera);
    }
    update();

    // Transformer le texte en particules au passage de la souris
    let particleGeometry, particleMaterial, particleSystem;

    canvas.addEventListener('mousemove', function (event) {
        const mouse = {
            x: event.clientX / window.innerWidth * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
        };

        if (particleSystem) {
            scene.remove(particleSystem);
        }

        particleGeometry = new THREE.BufferGeometry();
        for (let i = 0; i < geometry.vertices.length; i++) {
            const vertex = geometry.vertices[i];
            const particle = new THREE.Vector3(vertex.x, vertex.y, vertex.z);

            particleGeometry.vertices.push(particle);
        }

        particleMaterial = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 10
        });

        particleSystem = new THREE.Points(particleGeometry, particleMaterial);

        scene.add(particleSystem);

        updateParticles(mouse);
    });

    function updateParticles(mouse) {
        for (let i = 0; i < particleGeometry.vertices.length; i++) {
            const particle = particleGeometry.vertices[i];

            const distance = Math.sqrt((particle.x - mouse.x) ** 2 + (particle.y - mouse.y) ** 2);

            const zFactor = Math.sin(distance * 10) * 10;

            particle.z = zFactor;
        }

        particleGeometry.verticesNeedUpdate = true;
    }
});
