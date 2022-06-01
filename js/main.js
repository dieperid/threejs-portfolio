/**
 * @author David Dieperink
 * @description Main file of the website
 * @see https://github.com/dieperid/threejs-portfolio
*/

import '../css/style.css';
import * as THREE from 'three';
import {GUI} from 'dat.gui';
import Stats from 'three/examples/jsm/libs/stats.module'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {createSun, createEarth, createClouds, createStars} from './objects/planets.js';
import {addCubicRoom, addRectangularRoom} from './objects/room.js';

/**
 * This block of code is used to create a scene,
 * a camera to show the elements of the website,
 * a renderer to display 3D and finally a controls to move the camera.
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 17;
camera.position.y = 15;
camera.position.x = 30;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
const controls = new OrbitControls(camera, renderer.domElement);
var gui = new GUI();

const stats = Stats()
document.body.appendChild(stats.domElement);
document.body.appendChild(renderer.domElement);

// Creating the earth, the clouds and the stars
const sun = createSun();
const earth = createEarth();
const clouds = createClouds();
const stars = createStars();

// Adding these object to the scene
scene.add(stars);
scene.add(clouds);
scene.add(earth);
scene.add(sun);

// Creating 2 types of light and adding them to the scene
// scene.add(new THREE.AmbientLight(0xffffff));
var light = new THREE.DirectionalLight(0xffffff, 2);
var helper = new THREE.DirectionalLightHelper(light, 2);
light.position.set(0, 0, 0);
light.target = earth;
scene.add(light);

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', 0, 30);
cameraFolder.add(camera.position, 'y', 0, 30);
cameraFolder.add(camera.position, 'z', 0, 30);

window.addEventListener("keydown", function(event) {
	switch (event.code) {
		case "KeyW":
			camera.position.set(camera.position.x, camera.position.y, camera.position.z -= 0.1);
			break;
	}
})


const tick = () => {
	stats.update();
	window.requestAnimationFrame(tick);
	earth.rotation.y += 0.005;
	clouds.rotation.y += 0.005;
	sun.rotation.y += 0.005;
	renderer.render( scene, camera );
	
}

tick();