/**
 * @author David Dieperink
 * @description Main file of the website
 * @see https://github.com/dieperid/threejs-portfolio
*/

import '../css/style.css';
import * as THREE from 'three';
import { GUI } from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createSun, createEarth, createClouds, createStars } from './objects/planets.js';
import { addCubicRoom, addRectangularRoom } from './objects/room.js';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls.js';

/**
 * This block of code is used to create a scene,
 * a camera to show the elements of the website,
 * a renderer to display 3D and finally a controls to move the camera.
 */

let app, stats, gui;
let camera, controls, scene, renderer, cameraControlsFirstPerson;
let earth, sun, clouds, stars;
let rectLight, rectLightHelper, light;

const clock = new THREE.Clock();

init();
animate();

function init() {
	app = document.getElementById('app');

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
	camera.position.set(40, 40, 40);
	camera.lookAt(scene.position);

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setSize(innerWidth, innerHeight);
	renderer.setPixelRatio(devicePixelRatio);
	app.appendChild(renderer.domElement);

	controls = new OrbitControls(camera, renderer.domElement);
	cameraControlsFirstPerson = new FirstPersonControls(camera, renderer.domElement);
	cameraControlsFirstPerson.movementSpeed = 200;
	cameraControlsFirstPerson.lookSpeed = 0.1;


	// Camera:Setup

	console.log(cameraControlsFirstPerson);

	gui = new GUI();

	stats = new Stats()
	app.appendChild(stats.domElement);
	app.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize);

	// Creating the earth, the clouds, the sun and the stars
	sun = createSun();
	earth = createEarth();
	clouds = createClouds();
	stars = createStars();

	// Adding these object to the scene
	const elements = [
		sun, earth, clouds, stars
	];

	RectAreaLightUniformsLib.init();

	rectLight = new THREE.RectAreaLight(0xffffff, 1.5, 10, 10);
	rectLight.position.set(earth.position.x + 3, 1.5, earth.position.z + 3);
	rectLight.lookAt(earth.position.x, earth.position.y, earth.position.z);
	scene.add(rectLight);

	rectLightHelper = new RectAreaLightHelper(rectLight);
	rectLight.add(rectLightHelper);

	light = new THREE.AmbientLight(0xffffff, 1);
	scene.add(light);

	addGuiFolder();
	elements.forEach(addSceneElement);
}

animate();

/**
 * Function to render the sceneww
 */
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

	cameraControlsFirstPerson.update(clock.getDelta());
	renderer.render(scene, camera);

}

/**
 * Function to update the size of the Renderer
 */
function onWindowResize() {

	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = (window.innerWidth / window.innerHeight);
	camera.updateProjectionMatrix();
	cameraControlsFirstPerson.handleResize();

}

/**
 * Function to add folder to the GUI
 */
function addGuiFolder() {

	const ambientLight = gui.addFolder('THREE:AmbientLight');
	ambientLight.add(light, 'intensity', 0.0, 5.0);

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