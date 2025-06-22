// Sets up the Three.js scene, camera, renderer, and OrbitControls.
// Exports scene, camera, renderer, controls, and a function initScene().

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

let scene, camera, renderer, controls;

/**
 * Initializes the scene, camera, renderer, and OrbitControls.
 * - Scene background is a light gray.
 * - A PerspectiveCamera positioned to look at the origin.
 * - A WebGLRenderer attached to the #viewer-canvas, with shadows enabled.
 * - OrbitControls for damping, zoom, pan, and rotation.
 */
function initScene() {
  // 1. Create Scene and set background color
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf0f0f0);

  // 2. Create Camera
  const aspect = window.innerWidth / window.innerHeight;
  camera = new THREE.PerspectiveCamera(60, aspect, 0.1, 1000);
  camera.position.set(0, 2.5, 5); 
  camera.lookAt(0, 0, 0);

  // 3. Initialize the renderer with antialiasing and shadow support
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('viewer-canvas'),
    antialias: true,
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true; // Enable shadows globally

  // 4. Configure OrbitControls:
  // - enableDamping for smooth motion
  // - enableZoom and enablePan for user navigation
  // - enableRotate to allow user override of auto-rotate
  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableRotate = true; // Handled by auto-rotate
  controls.minDistance = 1;
  controls.maxDistance = 20;
  controls.target.set(0, 1, 0);

  // 5. Render loop: update controls and render each frame
  function renderLoop() {
    requestAnimationFrame(renderLoop);
    controls.update();
    renderer.render(scene, camera);
  }
  renderLoop();
}

// Export references
export {
  initScene,
  scene,
  camera,
  renderer,
  controls
};
