import data from "../static/json/projectDataStructure.json";
var ribbonWidth = 10;
const scene = new THREE.Scene();
scene.background = new THREE.Color("#262626");

// Set up camera
const camera = new THREE.PerspectiveCamera(
  75,
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

function ribbonDrawing1() {
  const ribbonsG = new THREE.Group();
  scene.add(ribbonsG);

  const ribbon = new THREE.Group();
  ribbonsG.add(ribbon);

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

ribbonDrawing1();

function projectDrawing() {
  const projectG = new THREE.Group();
  scene.add(projectG);
  const massingsG = new THREE.Group();
  projectG.add(massingsG);
  const massingG = new THREE.Group();

  data.project.massings.map((massing) => {
    massingDrawing(massing);
  });
}

function massingDrawing(massing) {
  const facadesG = new THREE.Group();
  data.massings[massing].facades.map((facade) => {
    facadeDrawing(facade);
  });
  massingsG.add(massingG);
}

function facadeDrawing(facade) {
  const facadeG = new THREE.Group();
  data.facades[facade].faces.map((face) => {
    faceDrawing(face);
  });
  facadesG.add(facadeG);
}

function faceDrawing(face) {
  const facesG = new THREE.Group();
  const ribbonsG = new THREE.Group();
  scene.add(ribbonsG);
  data.faces[face].ribbons.map((ribbon) => {
    ribbonDrawing(ribbon);
  });
}

function ribbonDrawing(ribbon) {
  const ribbonG = new THREE.Group();
  ribbonG.add(panelsG);
  const panelsG = new THREE.Group();
  data.ribbons[ribbon].panels.map((panel) => {
    console.log(data.panels[panel]);
    const panelG = new THREE.Group();

    panelsG.add(panelG);
    data.panels[panel].units.map((unit) => {
      data.units[unit].skins.map((skin) => {
        // console.log(data.skins[skin.id]);
        // if (data.panels[panel].name === "wall-panel") {
        // } else if (data.panels[panel].name === "glazing-panel") {
        // } else if (data.panels[panel].name === "wall-glazing") {
        // }
        const wall_panel = new THREE.Mesh(
          new THREE.BoxGeometry(50, 300, 25),
          new THREE.MeshBasicMaterial({ color: "#ffffff" })
        );
      });
    });
  });
}

projectDrawing();
