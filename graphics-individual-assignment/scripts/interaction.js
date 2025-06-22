// Detects hover & click on product parts via raycasting,
// gives visual feedback (outline + “pop” animation),
// and displays an info panel with part name/description.
// Exports setupInteraction() to wire up event listeners.

import * as THREE from 'three';
import { camera, renderer } from './initScene.js';
import { interactiveParts } from './createProduct.js';

let raycaster, mouse;
let INTERSECTED = null; // Currently hovered part

/**
 * Populate and show the HTML info panel for a clicked part.
 */
function showInfoPanel(part) {
  const panel = document.getElementById('info-panel');
  const nameEl = document.getElementById('part-name');
  const descEl = document.getElementById('part-desc');

  nameEl.textContent = part.name;
  descEl.textContent = part.userData.description || 'No description available.';
  panel.style.display = 'block';
  panel.style.opacity = '1';
}

/**
 * Hides the info panel.
 */
function hideInfoPanel() {
  const panel = document.getElementById('info-panel');
  panel.style.display = 'none';
}

/**
 * Creates a brief “pop” animation: scale up then back down.
 */
function animateClickFeedback(mesh) {
  const duration = 150; // ms
  const originalScale = mesh.scale.clone();
  const targetScale = originalScale.clone().multiplyScalar(1.2);

  // Grow quickly
  mesh.scale.copy(targetScale);
  setTimeout(() => {
    // Return to original
    mesh.scale.copy(originalScale);
  }, duration);
}

/**
 * Sets up mousemove and click listeners on the renderer’s DOM element.
 * - On hover: highlights mesh by changing its emissive color.
 * - On click: triggers animateClickFeedback and shows the info panel.
 */
function setupInteraction() {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();

  const canvas = renderer.domElement;

  

  // Handle mouse move to show hover highlight
  canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveParts, false);

    if (intersects.length > 0) {
      const hovered = intersects[0].object;
      if (INTERSECTED !== hovered) {
        // Restore previous
        if (INTERSECTED) {
          INTERSECTED.material.emissive.setHex(0x000000);
        }
        INTERSECTED = hovered;
        INTERSECTED.material.emissive.setHex(0x444444);
      }
    } else {
      if (INTERSECTED) {
        INTERSECTED.material.emissive.setHex(0x000000);
        INTERSECTED = null;
      }
    }
  });

  // Handle click to select part
  canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(interactiveParts, false);

    if (intersects.length > 0) {
      const clicked = intersects[0].object;
      animateClickFeedback(clicked);
      showInfoPanel(clicked);
    } else {
      hideInfoPanel();
    }
  });

  // Close button for info panel
  const closeBtn = document.getElementById('close-panel');
  closeBtn.addEventListener('click', hideInfoPanel);
}

export { setupInteraction };
