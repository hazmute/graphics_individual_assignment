// Adds ambient light and a directional/spot light to illuminate the product.
// Exports a function addLighting() that, when called, places lights into the scene.

import * as THREE from 'three';

function addLighting() {
  // Ambient Light (soft overall illumination)
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  // Directional Light to cast shadows and create highlights
  const dirLight = new THREE.DirectionalLight(0xffffff, 1.0);
  dirLight.position.set(5, 10, 5);
  dirLight.castShadow = true;
  // Improve shadow resolution & bounds
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.camera.left = -5;
  dirLight.shadow.camera.right = 5;
  dirLight.shadow.camera.top = 5;
  dirLight.shadow.camera.bottom = -5;

  // Lazily grab the initialized scene (avoids circular dependency) and add our lights

  import('./initScene.js').then(({ scene }) => {
    scene.add(ambientLight);
    scene.add(dirLight);
  });
}

export { addLighting };
