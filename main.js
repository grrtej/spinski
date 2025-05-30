import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 5, 10);

const controls = new OrbitControls(camera, renderer.domElement);

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const axesHelper = new THREE.AxesHelper(10);
axesHelper.position.set(-5, 0, - 5);
scene.add(axesHelper);

const pyramid = new THREE.Mesh(new THREE.TetrahedronGeometry(), new THREE.MeshNormalMaterial());
scene.add(pyramid);

function animate() {
    pyramid.rotation.x += 0.01;
    pyramid.rotation.y += 0.01;

    renderer.render(scene, camera);
}
