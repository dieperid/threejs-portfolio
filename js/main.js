/**
 * @author David Dieperink
 * @description Main file of the website
 * @see https://github.com/dieperid/threejs-portfolio
*/

import '../css/style.css';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSun, createEarth, createClouds, createStars } from './objects/planets.js';
import { addCubicRoom, addRectangularRoom } from './objects/room.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';

/**
 * This block of code is used to create a scene,
 * a camera to show the elements of the website,
 * a renderer to display 3D and finally a controls to move the camera.
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
	antialias: true
});
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
camera.position.z = 17;
camera.position.y = 15;
camera.position.x = 30;

const controls = new OrbitControls(camera, renderer.domElement);
var gui = new GUI();

const stats = Stats()
document.body.appendChild(stats.domElement);
document.body.appendChild(renderer.domElement);

// Creating the earth, the clouds, the sun and the stars
const sun = createSun(),
	earth = createEarth(),
	clouds = createClouds(),
	stars = createStars();

// Adding these object to the scene
const elements = [
	sun, earth, clouds, stars
];

RectAreaLightUniformsLib.init();

const rectLight = new THREE.RectAreaLight(0xffffff, 1.5, 10, 10);
rectLight.position.set(earth.position.x, 1.5, earth.position.z + 4);
rectLight.lookAt(earth.position.x, earth.position.y, earth.position.z);
scene.add(rectLight);

const rectLightHelper = new RectAreaLightHelper(rectLight);
rectLight.add(rectLightHelper);

// const light = new THREE.AmbientLight(0xffffff, 1);
// scene.add(light);

addGuiFolder();

window.addEventListener("keydown", function (event) {
	switch (event.code) {
		case "KeyW":
			camera.position.set(camera.position.x, camera.position.y, camera.position.z -= 0.1);
			break;
	}
})

elements.forEach(addSceneElement);

function animate() {

	window.requestAnimationFrame(animate);
	earth.rotation.y += 0.005;
	clouds.rotation.y += 0.005;
	sun.rotation.y += 0.005;

	render();

	window.addEventListener('resize', onWindowResize);
	stats.update();
}

/**
 * Function to render the scene and the camera
 */
function render() {
	renderer.render(scene, camera);
}

animate();

/**
 * Function to update the size of the Renderer
 */
function onWindowResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = (window.innerWidth / window.innerHeight);
	camera.updateProjectionMatrix();
}

/**
 * Function to add folder to the GUI
 */
function addGuiFolder() {

	const rectAreaLight = gui.addFolder('THREE.RectAreaLight');
	rectAreaLight.add(rectLight, 'intensity', 0.0, 5.0);
	rectAreaLight.add(rectLight.position, 'x', -30, 30, 0.01);
	rectAreaLight.add(rectLight.position, 'y', -30, 30, 0.01);
	rectAreaLight.add(rectLight.position, 'z', -30, 30, 0.01);

	const cameraFolder = gui.addFolder('Camera');
	cameraFolder.add(camera.position, 'x', -30, 30, 0.01);
	cameraFolder.add(camera.position, 'y', -30, 30, 0.01);
	cameraFolder.add(camera.position, 'z', -30, 30, 0.01);
}

/**
 * Function to add item to the scene
 * @param {const} item Item to add 
 */
function addSceneElement(item) {
	scene.add(item);
}