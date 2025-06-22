
/** 
 * Constructs a simple chair from basic geometries (boxes & cylinders).
 * Exports:
 * - createProduct(): builds meshes, names them, and populates interactiveParts.
 * - productGroup: THREE.Group containing all parts.
 * - interactiveParts: array of Meshes that respond to raycasting.
 * */ 
  
import * as THREE from 'three';

// Group that holds the entire product
const productGroup = new THREE.Group();

// Array to keep track of parts that should be interactive
const interactiveParts = [];

/**
 * Creates a stylized chair using boxes (seat, back) and cylinders (legs).
 * Each part is named and given a description. All parts are added to productGroup,
 * which is then added to the global scene.
 */
function createProduct() {
  // 1. Seat (Box)
  const seatGeometry = new THREE.BoxGeometry(2, 0.2, 2);
  const seatMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
  const seatMesh = new THREE.Mesh(seatGeometry, seatMaterial);
  seatMesh.position.set(0, 1, 0);
  seatMesh.castShadow = true;
  seatMesh.receiveShadow = true;
  seatMesh.name = 'Seat';
  seatMesh.userData.description = 'The flat wooden seat of the chair.';
  interactiveParts.push(seatMesh);
  productGroup.add(seatMesh);

  // 2. Backrest (Box)
  const backGeometry = new THREE.BoxGeometry(2, 2, 0.2);
  const backMaterial = new THREE.MeshStandardMaterial({ color: 0x8b896 });
  const backMesh = new THREE.Mesh(backGeometry, backMaterial);
  backMesh.position.set(0, 2, -0.9);
  backMesh.castShadow = true;
  backMesh.receiveShadow = true;
  backMesh.name = 'Backrest';
  backMesh.userData.description = 'The wooden backrest for support.';
  interactiveParts.push(backMesh);
  productGroup.add(backMesh);

  // 3. Four Legs (Cylinders)
  const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2, 16);
  const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8b454946 });
  const legPositions = [
    [-0.9, 0, -0.9],
    [0.9, 0, -0.9],
    [-0.9, 0, 0.9],
    [0.9, 0, 0.9]
  ];
  legPositions.forEach((pos, idx) => {
    const legMesh = new THREE.Mesh(legGeometry, legMaterial);
    legMesh.position.set(pos[0], 0, pos[2]);
    legMesh.castShadow = true;
    legMesh.receiveShadow = true;
    legMesh.name = `Leg ${idx + 1}`;
    legMesh.userData.description = `Wooden leg number ${idx + 1}.`;
    interactiveParts.push(legMesh);
    productGroup.add(legMesh);
  });

  // 4. Cylinder‐Style Cushion

const cushionGeometry = new THREE.CylinderGeometry(0.8, 0.7, 0.2, 32, 1, false);
const cushionMaterial = new THREE.MeshPhysicalMaterial({
  color: 0x01a8429,
  roughness: 1,
  metalness: 0.1
});
const cushionMesh = new THREE.Mesh(cushionGeometry, cushionMaterial);

// Position it at seat height (+0.1 since height is 0.2 total)
cushionMesh.position.set(0, 1.1, 0);

cushionMesh.castShadow = true;
cushionMesh.receiveShadow = true;
cushionMesh.name = 'Cushion';
cushionMesh.userData.description = 'Soft circular cushion.';

interactiveParts.push(cushionMesh);
productGroup.add(cushionMesh);
    

  // Add the assembled chair to the global scene
  import('./initScene.js').then(({ scene }) => {
    scene.add(productGroup);
  });
}

// Export both the group and the list of interactive parts
export {
  createProduct,
  productGroup,
  interactiveParts
};
