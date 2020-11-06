import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 8000);

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xC5C5C3);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({
    color: 0xd00050,
    flatShading: true
});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 1, 0);
scene.add(cube);

camera.position.set(0, 7.5, 10);
camera.lookAt(0, 0, 0);

const fogColor = new THREE.Color(0xf0f0f0);

scene.background = fogColor
scene.fog = new THREE.Fog(fogColor, 2.5, 30);



//const controls = OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xcccccc, 2);
scene.add(ambientLight);
const directionLight = new THREE.DirectionalLight(0xffff8f, 0.5);
directionLight.castShadow = true;
scene.add(directionLight);
const targetObject = new THREE.Object3D();
scene.add(targetObject);

directionLight.target = targetObject;
targetObject.position.set(3, 0, 1);


const controls = new OrbitControls(camera, renderer.domElement);
controls.maxPolarAngle = 1.6;
controls.minPolarAngle = 0;

controls.update();

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onClick(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children);

    intersects.forEach(function(element) {
        if (element.object.id == cube.id) {
            var win = window.open('https://www.youtube.com/', '_blank');
            win.focus();
            console.log('redirect');
        }
    });
}

window.addEventListener('click', onClick, false);


function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    controls.update();
    renderer.render(scene, camera);
}
animate();

var loader = new GLTFLoader();
loader.crossOrigin = true;
loader.load('../models/ergaki/Ergaki_1_1.gltf', function(data) {


    var object = data.scene;
    // object.scale.set(0.5, 0.5, 0.5);
    object.position.set(0, -5, 0);

    //object.position.y = - 95;
    scene.add(object);
    console.log(data.scene.children[0])
        //, onProgress, onError );
});