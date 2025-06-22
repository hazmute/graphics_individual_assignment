// Implements auto-orbit around the product about the Y-axis, plus
// pause/resume behavior on user interaction.
// Exports startAutoRotate(), which begins the animation loop.

import { camera, controls } from './initScene.js';
import * as THREE from 'three';

let isAutoRotating = true;  // tracks whether we are currently auto-rotating
let resumeTimeoutId = null; // tracks delayed resume after interaction

// Spherical coordinates describing camera→target vector:
//   r     = distance from target
//   polar = inclination (angle down from +Y)
//   azim  = angle around Y‐axis in XZ‐plane 
let r = 5;
let polar = Math.PI / 3;  
let azim = 0;

// How fast to spin (radians per second)
const ANGULAR_SPEED = 0.2;
// Delay (ms) after interaction before resuming auto-rotation
const RESUME_DELAY_MS = 500;
// The point we orbit around and look at
const TARGET = new THREE.Vector3(0, 1, 0);


//Recomputes (r, polar, azim) from current camera position relative to TARGET.
 
function recalcSphericalFromCamera() {
  // Vector from target to camera
  const v = camera.position.clone().sub(TARGET);
  r = v.length();
  // Prevent r = 0
  if (r < 1e-6) {
    r = 1e-6;
  }
  polar = Math.acos(THREE.MathUtils.clamp(v.y / r, -1, 1));
  azim = Math.atan2(v.z, v.x);
}

/**
 * Given (r, polar, azim), sets camera.position accordingly and makes it look at TARGET.
 */
function updateCameraFromSpherical() {
  // Convert spherical coords back to Cartesian
  const sinP = Math.sin(polar);
  const x = r * sinP * Math.cos(azim);
  const y = r * Math.cos(polar);
  const z = r * sinP * Math.sin(azim);

  camera.position.set(x + TARGET.x, y + TARGET.y, z + TARGET.z);
  camera.lookAt(TARGET);
  controls.update();
}

// Immediately pauses automatic orbit. 
function pauseAutoRotate() {
  if (resumeTimeoutId !== null) {
    clearTimeout(resumeTimeoutId);
    resumeTimeoutId = null;
  }
  isAutoRotating = false;
}

/**
 * After user interaction ends (pointerup or last wheel event),
 * recalculate spherical coords and schedule auto-rotation to resume.
 */
function scheduleResume() {
  // Recalculate spherical coordinates from wherever the camera is now
  recalcSphericalFromCamera();

  // If already a pending resume, do nothing
  if (resumeTimeoutId !== null) return;

  resumeTimeoutId = setTimeout(() => {
    isAutoRotating = true;
    resumeTimeoutId = null;
  }, RESUME_DELAY_MS);
}

/**
 * Called on pointerdown: pause auto‐rotation immediately.
 */
function onPointerDown() {
  pauseAutoRotate();
}

/**
 * Called on pointerup: pause was already done on down; now schedule resume.
 */
function onPointerUp() {
  scheduleResume();
}

/**
 * Called on wheel (zoom): pause, let OrbitControls handle the zoom,
 * then immediately recalc spherical coords and schedule resume.
 */
function onWheel() {
  pauseAutoRotate();
  // wait a short amount of time so OrbitControls updates camera.position first
  setTimeout(() => {
    scheduleResume();
  }, 0);
}

/**
 * Sets up event listeners to pause/resume auto‐rotation on pointer & wheel events.
 */
function setupPauseOnInteraction() {
  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUp);
  window.addEventListener('wheel', onWheel, { passive: true });
}
/**
 * Starts the render loop: 
 * - if isAutoRotating, increment azimuth each frame 
 * - otherwise let OrbitControls handle user-driven updates
 */
function startAutoRotate() {
  recalcSphericalFromCamera();
  setupPauseOnInteraction();

  let lastTime = performance.now() / 1000;
  function animate() {
    requestAnimationFrame(animate);
    const now = performance.now() / 1000;
    const deltaTime = now - lastTime;
    lastTime = now;

    if (isAutoRotating) {
      // Only spin the azimuth; keep radius & polar constant.
      azim += ANGULAR_SPEED * deltaTime;
      updateCameraFromSpherical();
    } else {
      controls.update();
      camera.lookAt(TARGET);
    }
  }
  animate();
}

export { startAutoRotate };
