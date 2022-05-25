/**
 * @author David Dieperink
 * @description Main file of the website
 * @see https://github.com/dieperid/threejs-portfolio
*/

import '../css/style.css';
import * as THREE from 'three';
import {GUI} from 'dat.gui';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {createEarth, createClouds, createStars} from './objects/earth.js';
import {addCubicRoom, addRectangularRoom} from './objects/room.js';


/**
 * This block of code is used to create a scene,
 * a camera to show the elements of the website,
 * a renderer to display 3D and finally a controls to move the camera.
 */
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
camera.position.z = 10;
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);
const controls = new OrbitControls(camera, renderer.domElement);
var gui = new GUI();


document.body.appendChild(renderer.domElement);

// Creating the earth, the clouds and the stars
const earth = createEarth();
const clouds = createClouds();
const stars = createStars();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Adding these object to the scene
scene.add(stars);
scene.add(clouds);
scene.add(earth);

// Creating 2 types of light and adding them to the scene
scene.add(new THREE.AmbientLight(0x333333));
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5,3,5);
scene.add(light);

addCubicRoom(scene, 2, 0, 0, 8);
addRectangularRoom(scene, 2, 2, 0, 2, 0, 4);

const cameraFolder = gui.addFolder('Camera');
cameraFolder.add(camera.position, 'x', 0, 10);
cameraFolder.add(camera.position, 'y', 0, 10);
cameraFolder.add(camera.position, 'z', 0, 10);

window.addEventListener("keydown", function(event) {
	switch (event.code) {
		case "KeyW":
			camera.position.set(camera.position.x += 1, 0, 0);
			break;
	}
})


const tick = () => {
	window.requestAnimationFrame(tick);
	earth.rotation.y += 0.003;
	clouds.rotation.y += 0.003;
	renderer.render( scene, camera );
	
}

tick();