/**
 * @author David Dieperink
 * @description File to create different type of room
 * @see https://github.com/dieperid/threejs-portfolio
*/

import '../../css/style.css';
import * as THREE from 'three';

/**
 * Function to create a single wall
 * @param {int} width Width of the wall
 * @param {int} height Height of the wall
 * @param {string} color Color of the wall
 * @param {object} pos Position of the wall
 * @param {object} rot Rotation of the wall
 * @return {THREE.Mesh} The wall
 */
function addWall(width, height, color, pos = {x: 0, y: 0, z: 0}, rot = {x: 0, y: 0, z: 0}) {
    const geometry = new THREE.PlaneGeometry(width, height);
    const material = new THREE.MeshPhongMaterial({color: color, side : THREE.DoubleSide})
    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(pos.x, pos.y, pos.z);
    plane.rotation.set(rot.x, rot.y, rot.z);
    return plane;
}

/**
 * Function to create cubic room
 * @param {THREE.Scene} scene Scene of the program
 * @param {int} wallSize Size of the wall
 * @param {int} gapX Gap for the X position
 * @param {int} gapY Gap for the Y position
 * @param {int} gapZ Gap for the Z position
 */
export function addCubicRoom(scene, wallSize, gapX, gapY, gapZ)
{
    let posWidth = wallSize;    // Assign wallSize to posWidth

    // floor
    scene.add(addWall(wallSize, wallSize, 0xffffff, {x: 0 - gapX, y: 0 - gapY, z: - gapZ}, {x: - Math.PI / 2, y : 0, z: 0}));
    // ceiling
    scene.add(addWall(wallSize, wallSize, 0xffffff, {x: 0 - gapX, y: posWidth - gapY, z: - gapZ}, {x: Math.PI / 2, y : 0, z: 0}));
    // right wall
    scene.add(addWall(wallSize, wallSize, 0x00ff00, {x: posWidth / 2 - gapX, y: posWidth / 2 - gapY, z: - gapZ}, {x: 0, y : - Math.PI / 2, z: 0}));
    // left wall
    scene.add(addWall(wallSize, wallSize, 0xff0000, {x: -posWidth / 2 - gapX, y: posWidth / 2 - gapY, z: - gapZ}, {x: 0, y : Math.PI / 2, z: 0}));
    // far wall
    scene.add(addWall(wallSize, wallSize, 0x7f7fff, {x: 0 - gapX, y: posWidth / 2 - gapY, z: -posWidth / 2 - gapZ}, {x: 0, y : 0, z: 0}));
    // close wall
    scene.add(addWall(wallSize, wallSize, 0x7f7fff, {x: 0 - gapX, y: posWidth / 2 - gapY, z: posWidth / 2 - gapZ}, {x: 0, y : Math.PI, z: 0}));
}

/**
 * Function to create rectangular room
 * @param {THREE.Scene} scene Scene of the program
 * @param {int} wallWidth Width of the walls
 * @param {int} wallHeight Height of the walls
 * @param {int} gapHeight Height gap for some wall
 * @param {int} gapX Gap for the X position
 * @param {int} gapY Gap for the Y position
 * @param {int} gapZ Gap for the Z position
 */
export function addRectangularRoom(scene, wallWidth, wallHeight, gapHeight, gapX, gapY, gapZ)
{
    let farCloseWallPos = wallWidth;    // Position for the far and the close wall of the room
    let posWidth = wallHeight,          // Position of all the wall
        farCloseWallWidth = wallHeight; // Width of the far and the close wall

    // floor
    scene.add(addWall(wallWidth, wallHeight, 0xffffff, {x: 0 - gapX, y: - gapY, z: - gapZ}, {x: - Math.PI / 2, y : 0, z: Math.PI / 2}));
    // ceiling
    scene.add(addWall(wallWidth, wallHeight, 0xffffff, {x: 0 - gapX, y: posWidth - gapHeight - gapY, z: - gapZ}, {x: Math.PI / 2, y : 0, z: Math.PI / 2}));
    // right wall
    scene.add(addWall(wallWidth, wallHeight - gapHeight, 0x00ff00, {x: posWidth / 2 - gapX, y: posWidth / 2 - gapHeight / 2 - gapY, z: - gapZ}, {x: 0, y : - Math.PI / 2, z: 0}));
    // left wall
    scene.add(addWall(wallWidth, wallHeight - gapHeight, 0xff0000, {x: -posWidth / 2 - gapX, y: posWidth / 2 - gapHeight / 2 - gapY, z: - gapZ}, {x: 0, y : Math.PI / 2, z: 0}));
    // far wall
    scene.add(addWall(farCloseWallWidth, wallHeight - gapHeight, 0x7f7fff, {x: 0 - gapX, y: posWidth / 2 - gapHeight / 2 - gapY, z: -farCloseWallPos / 2 - gapZ}, {x: 0, y : 0, z: 0}));
    // close wall
    scene.add(addWall(farCloseWallWidth, wallHeight - gapHeight, 0x7f7fff, {x: 0 - gapX, y: posWidth / 2 - gapHeight / 2 - gapY, z: farCloseWallPos / 2 - gapZ}, {x: 0, y : Math.PI, z: 0}));
}