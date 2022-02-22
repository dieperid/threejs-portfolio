import '../css/style.css';
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

console.log(scene);

document.body.appendChild(renderer.domElement);
camera.position.z = 5;

const planeGeometry = new THREE.PlaneGeometry(5, 5, 10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({color: 0xff0000, side: THREE.DoubleSide});
const planeMesh = new THREE.Mesh( planeGeometry, planeMaterial );
scene.add(planeMesh);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
scene.add(light);

console.log(planeGeometry);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();