import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
import { configure } from './MapManager';
import { random } from 'lodash';


function clampNumber(num, a, b) {
    return Math.max(Math.min(num, Math.max(a, b)), Math.min(a, b));
}

var clock = new THREE.Clock();

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 8000);

var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
renderer.setClearColor(0xC5C5C3);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.gammaOutput = true;
renderer.domElement.id = "Map";
//document.body.appendChild(renderer.domElement);
document.body.prepend(renderer.domElement);

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

var QuardsMeshes = new Array();

function onClick(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    let canvasBounds = renderer.getContext().canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - canvasBounds.left) / (canvasBounds.right - canvasBounds.left)) * 2 - 1;
    mouse.y = -((event.clientY - canvasBounds.top) / (canvasBounds.bottom - canvasBounds.top)) * 2 + 1;
    // mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    // mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);

    intersects.forEach(function(element) {
        console.log(element.object.name);
        if (element.object.id == cube.id) {
            var win = window.open('https://www.youtube.com/', '_blank');
            win.focus();
            console.log('redirect');
        }
        if (element.object.name === "Line061_1") {
            pano.openNext("{node3}");
            console.log(element.object.name);
        }
        if (element.object.name === "Line064_1") {
            pano.openNext("{node2}");
            console.log(element.object.name);
        }
        if (element.object.name === "Line059_1") {
            pano.openNext("{node1}");
            console.log(element.object.name);
        }
        if (element.object.name === "Line060_1") {
            pano.openNext("{node4}");
            console.log(element.object.name);
        }
    });
}

window.addEventListener('click', onClick, false);


function animate() {
    requestAnimationFrame(animate);
    const time = performance.now();
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    QuardsMeshes.forEach(function(element) {

        // element.scale.x = clampNumber(time % 500, 100, 300) / 100;
        // element.scale.y = clampNumber(time % 500, 100, 300) / 100;
        // element.scale.z = clampNumber(time % 500, 100, 300) / 100;
    })
    controls.update();
    renderer.render(scene, camera);
}
animate();

var loader = new GLTFLoader();
loader.crossOrigin = true;
loader.load('../models/GLTF_1/PBR - Metallic Roughness.gltf', function(data) {


    var object = data.scene;
    // object.scale.set(0.5, 0.5, 0.5);
    object.position.set(0, -5, 0);

    //object.position.y = - 95;
    scene.add(object);
    let root = data.scene.children[0];
    root.children.forEach(function(element) {
        console.log(element.name);
        if (element.name.includes('Quad')) {
            console.log(element.name);
            QuardsMeshes.push(element);
        }
    })
    console.log(QuardsMeshes);
    //, onProgress, onError );
});