/**
 * @author David Dieperink
 * @description File to create an earth, clouds and stars
 * @see https://github.com/dieperid/threejs-portfolio
 * @source https://github.com/turban/webgl-earth
*/

import '../../css/style.css';
import * as THREE from 'three';


var radius = 0.8,   // Radius of the earth
    segments =32;   // Number of segments of the earth

/**
 * Function to create an earth
 * @returns {THREE.SphereGeometry} The earth
 */
export function createEarth()
{
    // Creating the earth with all of the parameters
    const earth = new THREE.Mesh(
        new THREE.SphereGeometry(radius,segments,segments),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('../../images/2_no_clouds_4k.jpg'),
            bumpMap: new THREE.TextureLoader().load('../../images/elev_bump_4k.jpg'),
            bumpScale: 0.005,
            specularMap: new THREE.TextureLoader().load('../../images/water_4k.png'),
            specular: new THREE.Color('grey')
        })
    );
    earth.position.set(-5,0,-3);    // Setting the position of the earth

    // Return the earth
    return earth;
}

/**
 * Function to create the clouds of the earth
 * @returns {THREE.SphereGeometry} Clouds of the earth
 */
export function createClouds()
{
    // Creating the clouds with all of the parameters
    const clouds = new THREE.Mesh(
        new THREE.SphereGeometry(radius + 0.003,segments,segments),
        new THREE.MeshPhongMaterial({
            map: new THREE.TextureLoader().load('../../images/fair_clouds_4k.png'),
            transparent: true
        })
    );
    clouds.position.set(-5,0,-3);   // Setting the position of the clouds

    // Return the clouds
    return clouds;
}

/**
 * Function to create stars for the background
 * @returns {THREE.Mesh} Stars of the background
 */
export function createStars()
{
    return new THREE.Mesh(
        new THREE.SphereGeometry(90, 64, 64),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('../../images/galaxy_starfield.png'),
            side: THREE.BackSide
        })
    );
}