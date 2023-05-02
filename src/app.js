import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const width = window.innerWidth;
const myText = document.getElementById("myText");

// Initialisez votre canevas WebGL

const canvas = document.getElementById('myCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

// Créez une scène
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);


// Chargez une police de caractères
const fontLoader = new FontLoader();
fontLoader.load('fonts/Cursive Sans_Book.json', function (font) {
    // Créez une géométrie de texte
    const geometry = new TextGeometry(myText.innerHTML, {
        font: font,
        size: 150,
        height: width / 6,
        curveSegments: 24,
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

    // Trouver le centre de la boîte englobante
    geometry.computeBoundingBox();
    const center = new THREE.Vector3();
    geometry.boundingBox.getCenter(center);

    // Déplacer le texte pour que le centre de sa boîte englobante soit au centre de l'écran
    text.position.set(-center.x, -center.y, 0);

    scene.add(text);

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 500)
    scene.add(light);

    // Positionnez la caméra pour voir le texte
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 500);

    // Redessinez le canevas WebGL
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Animation
    let duration = 40;
    let time = 0;
    function animate() {
        if (time < duration) {
            requestAnimationFrame(animate);
            time += 0.01;
            let t = time / duration;
            let ease = 1.5 - 0.8 * Math.cos(Math.PI * t);
            let position = 40 * ease;
            light.position.set(position * Math.cos(time), position * Math.sin(time), 50);
            text.position.z = -50 + 10 * Math.sin(time);
            renderer.render(scene, camera);
        }
    }
    animate();

});

//------------------------------------------------------------------------

const myText2 = document.getElementById("myText2")

canvas.addEventListener("mouseenter", function(){
    myText2.innerHTML = "oida"
})

canvas.addEventListener("mouseleave", function(){
    myText2.innerHTML = "adio"
})