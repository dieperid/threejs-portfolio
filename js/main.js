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

/**
 * This block of code is used to create a scene,
 * a camera to show the elements of the website,
 * a renderer to display 3D and finally a controls to move the camera.
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
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


// Creating a light for the sun and the earth
const earthLight = new THREE.PointLight(0xffffff, 1, 100);
earthLight.position.set(earth.position.x, earth.position.y, earth.position.z);
const sunLight = new THREE.PointLight(0xffffff, 3, 100);
sunLight.position.set(sun.position.x, sun.position.y, sun.position.z);

const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);
// Adding the lights to the elements array
elements.push(earthLight);
elements.push(sunLight);

addGuiFolder();

window.addEventListener("keydown", function (event) {
	switch (event.code) {
		case "KeyW":
			camera.position.set(camera.position.x, camera.position.y, camera.position.z -= 0.1);
			break;
	}
})

elements.forEach(addSceneElement)

function animate() {

	window.requestAnimationFrame(animate);
	earth.rotation.y += 0.005;
	clouds.rotation.y += 0.005;
	sun.rotation.y += 0.005;

	render();

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
 * Function to add folder to the GUI
 */
function addGuiFolder() {

	const pointLight = gui.addFolder('THREE.PointLight');
	pointLight.add(earthLight.position, 'x', -30, 30, 0.01);
	pointLight.add(earthLight.position, 'y', -30, 30, 0.01);
	pointLight.add(earthLight.position, 'z', -30, 30, 0.01);

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