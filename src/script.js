import data from "../static/json/projectDataStructure.json";

const scene = new THREE.Scene();
scene.background = new THREE.Color("#262626");

// Set up camera
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  10000
);
camera.position.z = 1000;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const light = new THREE.PointLight(0xffffff, 0.5);
light.position.set(0, 10, 10);
// for shadow
light.castShadow = true;
light.shadow.mapSize.width = 2048;
light.shadow.mapSize.height = 2048;
light.shadow.camera.near = 0.1;
light.shadow.camera.far = 10000;
scene.add(light);

window.addEventListener("resize", function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Render loop
const animate = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(animate);
};
animate();

function ribbonDrawing() {
  const ribbons = new THREE.Group();
  scene.add(ribbons);

  const ribbon = new THREE.Group();
  ribbons.add(ribbon);

  const wall_panel = new THREE.Mesh(
    new THREE.BoxGeometry(50, 300, 25),
    new THREE.MeshBasicMaterial({ color: "#ffffff" })
  );
  wall_panel.position.x = 125;

  ribbon.add(wall_panel);

  const wall_panel1 = new THREE.Mesh(
    new THREE.BoxGeometry(50, 300, 25),
    new THREE.MeshBasicMaterial({ color: "#ffffff" })
  );
  wall_panel1.position.x = -125;
  ribbon.add(wall_panel1);

  const glazing_panel = new THREE.Group();
  ribbon.add(glazing_panel);
  const glazing = new THREE.Mesh(
    new THREE.BoxGeometry(200, 250, 1),
    new THREE.MeshBasicMaterial({ color: "#E2492F" })
  );
  glazing.position.y = -25;

  const wall = new THREE.Mesh(
    new THREE.BoxGeometry(200, 50, 25),
    new THREE.MeshBasicMaterial({ color: "#ffffff" })
  );
  wall.position.y = 125;
  glazing_panel.add(glazing, wall);
}

ribbonDrawing();

function facesDrawing() {
  // const facades = THREE.Group();
  // scene.add(facades);
  console.log(data);
  console.log(
    data.faces[
      data.facades[data.massings[data.project.massings[0]].facades[0]].faces[0]
    ]
  );

  // data.faces.map((face) => {
  //   console.log(face);
  // });
}
facesDrawing();
