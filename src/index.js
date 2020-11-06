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
const material = new THREE.MeshBasicMaterial({
    color: 0x00ff00
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.set(1, 1, 20);

const controls = OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xcccccc);
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
}
animate();

var loader = new GLTF2Loader();
loader.crossOrigin = true;
loader.load('../models/scene.gltf', function(data) {


    var object = data.scene;
    object.position.set(0, 0, 0);

    //object.position.y = - 95;
    scene.add(object);
    console.log(data.scene.children[0])
        //, onProgress, onError );
});