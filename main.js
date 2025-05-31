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

for (let i = 0; i <= 10; i++) {
    const gridVertical = new THREE.GridHelper(10);
    const gridHorizontal = new THREE.GridHelper(10);
    gridVertical.rotation.z = THREE.MathUtils.degToRad(90);
    gridVertical.position.x = -5 + i;
    gridHorizontal.position.y = -5 + i;
    scene.add(gridVertical);
    scene.add(gridHorizontal);
}

const axes = new THREE.AxesHelper(5);
scene.add(axes);

function spinski(A, B, C) {
    const depthMax = 5;
    const triangles = [];

    rec(A, B, C, 0);

    return triangles;

    function rec(A, B, C, depth) {
        if (depth == depthMax) {
            triangles.push(new THREE.Shape([A, B, C]));
            return;
        }

        const midAB = A.clone().add(B).multiplyScalar(0.5);
        const midBC = B.clone().add(C).multiplyScalar(0.5);
        const midCA = C.clone().add(A).multiplyScalar(0.5);

        rec(A, midAB, midCA, depth + 1);
        rec(midAB, B, midBC, depth + 1);
        rec(midCA, midBC, C, depth + 1);
    }
}

const s = 10;
const h = s * Math.sqrt(3) / 2;
const A = new THREE.Vector2(-s / 2, -h / 2);
const B = new THREE.Vector2(s / 2, -h / 2);
const C = new THREE.Vector2(0, h / 2);

const triangles = spinski(A, B, C);

const fractal = new THREE.Group();
const material = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
for (const triangle of triangles) {
    const mesh = new THREE.Mesh(new THREE.ShapeGeometry(triangle), material);
    fractal.add(mesh);
}
scene.add(fractal);

function animate() {
    fractal.rotation.y += 0.01;

    renderer.render(scene, camera);
}
