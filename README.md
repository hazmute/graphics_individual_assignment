# Application Features

# Name: Hasset Dejene
# ID: UGR/7979/15
# SECTION: 1



# 1. Scene Setup
Scene Initialization: Set up a basic Three.js scene with:
PerspectiveCamera
WebGLRenderer
Canvas integration in the HTML

Responsiveness: Make the renderer update on window resize.
Controls: Add OrbitControls for zoom and pan (rotation can be disabled if using auto-rotate).


# 2. 3D Product Creation (Using Basic Meshes)
Product Composition: Build a single "product" using multiple THREE.Mesh objects (e.g., a chair made from boxes and cylinders).
Materials: Use MeshStandardMaterial or MeshPhysicalMaterial to show realistic lighting interaction.
Scene Centering: Ensure the product is centered at the origin (0, 0, 0) for proper camera rotation.
# 3. Lighting
Ambient Light: Add base ambient lighting for general illumination.
Directional or Spot Light: Add light(s) to create highlights and shadows on the mesh.
Light Positioning: Experiment with light placement for visual balance.


# 4. Mouse Interaction
Raycasting: Detect mouse clicks on different parts of the product.
Feedback: When a part is clicked:
Change color or scale briefly
Show a small panel with the part name (e.g., “Chair leg”)
Highlight Effect: Provide subtle hover or click feedback (e.g., outline or scale effect).


# 5. Camera Animation
Automatic Rotation: Animate the camera to orbit smoothly around the product over time (use p olar coordinates or tweening):
The camera should rotate horizontally around the Y-axis while always looking at the product.
Use a consistent rotation speed (e.g., based on time elapsed).
User Control Override (optional): Allow mouse control to override rotation (pause auto-rotation when user interacts).
# 6. Animation Loop
Render Loop: Use requestAnimationFrame for smooth rendering.
Mesh Animations: Optionally add floating or pulsing effects to the product for added life.
# 7. Code Structure
### Organize into modular files or functions:

    initScene.js
    createProduct.js
    addLighting.js
    interaction.js
    cameraAnimation.js
    Use clear, concise comments.
    Structure assets logically (e.g., separate folders for models, textures, etc.).
