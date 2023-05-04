import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

const height = window.innerHeight;
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
        height: height / 3,
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
    let animId
    let time = 0;
    function animate() {
        animId = requestAnimationFrame(animate);
        time += 0.01;
        light.position.set(200 * Math.cos(time), 200 * Math.sin(time), 100);
        text.position.z = -50 + 10 * Math.sin(time);
        renderer.render(scene, camera);
    }
    // Créez un observer pour la section 2
    const section2 = document.querySelector('#section2');
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    }
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.target.id === 'section2') {
                if (entry.isIntersecting) {
                    // La section 2 est visible, désactivez l'animation
                    cancelAnimationFrame(animId);
                } else {
                    // La section 2 n'est pas visible, activez l'animation
                    animate();
                }
            }
        })
    }, options);

    // Ajoutez l'observer à la section 2
    observer.observe(section2);

});

//------------------------------------------------------------------------EFFET TITLE

const myText2 = document.getElementById("myText2")

myText2.addEventListener("mouseenter", function () {
    myText2.innerHTML = "oida"
})

myText2.addEventListener("mouseleave", function () {
    myText2.innerHTML = "adio"
})

//------------------------------------------------------------------------ GSAP

gsap.registerPlugin(ScrollTrigger);

gsap.from("#paraTitle", {
    opacity: 0,
    y: -50,
    duration: 2,
    ease: "power2.inOut",
})

gsap.from("#paraTitle2", {
    opacity: 0,
    y: 50,
    duration: 2,
    delay: 0.5,
    ease: "power2.inOut",
})

gsap.from("#trait1", {
    height: 0,
    duration: 2.5,
    delay: 1,
    ease: "power2.inOut",
})

gsap.from("#trait2", {
    height: 0,
    duration: 2.5,
    delay: 1.5,
    ease: "power2.inOut",
})

gsap.utils.toArray(".circle").forEach((circle, index) => {
    gsap.from(circle, {
        x: 0,
        backgroundColor: "red",
        duration: 1.5,
        ease: "power2.inOut",
        delay: index / 4,
        scrollTrigger: {
            trigger: ".circle",
            start: "top 90%",
        }

    })
})

gsap.utils.toArray(".traitCard").forEach((trait, index) => {
    gsap.from(trait, {
        height: 0,
        duration: 1,
        ease: "power3.inOut",
        delay: index / 4,
        scrollTrigger: {
            trigger: ".traitCard",
            start: "top 80%"
        }
    })
})

gsap.utils.toArray(".paraCard").forEach((para, index) => {
    gsap.from(para, {
        opacity: 0,
        duration: 1.5,
        ease: "power3.inOut",
        delay: index / 4,
        scrollTrigger: {
            trigger: ".traitCard",
            start: "top 80%"
        }
    })
})

//----------------------------------------------CIRCLE-----------------------

const circles = document.querySelectorAll(".circle");

circles.forEach(circle => {
    circle.addEventListener('mouseenter', function () {
        circle.style.backgroundColor = "red";
    })
    circle.addEventListener('mouseleave', function () {
        circle.style.backgroundColor = "white";
    })
})


//-----------------------------------------------SVG------------------------

