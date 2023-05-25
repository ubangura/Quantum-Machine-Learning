import "./style.css";

// Import three.js
import * as THREE from "three";

// Move around scene using mouse
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// For adding text to scene
import {
  CSS2DRenderer,
  CSS2DObject,
} from "three/addons/renderers/CSS2DRenderer.js";

// GUI
import * as dat from "dat.gui";

// Creates responsiveness of scene
const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Container for objects, lights, & camera
const scene = new THREE.Scene();

// Camera allows us to see
// FOV, aspect ratio, view frustrum - controls which objects are visible
const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
camera.position.setZ(28);
camera.position.setX(10);
camera.position.setY(10);

// Renderer creates graphics in the scene
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#visualization"),
  antialias: true,
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(size.width, size.height);
renderer.setClearColor(0x2c3333);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(ambientLight);

// Grid
const gridParameter = {
  visible: true,
};

const gridHelper = new THREE.GridHelper(21, 40);
scene.add(gridHelper);

// Polar Grid
const polarGridParameter = {
  visible: false,
};

const polarGridHelper = new THREE.PolarGridHelper(10, 16, 8, 64);

// Qubit
const radius = 10;
const geometry = new THREE.SphereGeometry(radius, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: 0x6929c4,
  transparent: true,
  opacity: 0.2,
});
const qubit = new THREE.Mesh(geometry, material);
scene.add(qubit);

const outlineMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  side: THREE.BackSide,
});
const outlineMesh = new THREE.Mesh(geometry, outlineMaterial);
outlineMesh.scale.multiplyScalar(1.009);
scene.add(outlineMesh);

// |0> State
const grdStateParameter = {
  visible: true,
};
const geometry1 = new THREE.SphereGeometry(0.5, 24, 24);
const material1 = new THREE.MeshStandardMaterial({
  color: 0x000000,
});
const grdState = new THREE.Mesh(geometry1, material1);
grdState.position.set(0, 10, 0);
scene.add(grdState);

const grdDiv = document.createElement("div");
grdDiv.className = "label";
grdDiv.id = "stateLabel";
grdDiv.textContent = "|0>";

const grdLabelParameter = {
  visible: true,
};
const grdLabel = new CSS2DObject(grdDiv);
grdLabel.position.set(0, 0, 0);
grdLabel.center.set(1.5, 2);
grdState.add(grdLabel);

// |1> State
const oneStateParameter = {
  visible: true,
};
const geometry2 = new THREE.SphereGeometry(0.5, 24, 24);
const material2 = new THREE.MeshStandardMaterial({
  color: 0x000000,
});
const oneState = new THREE.Mesh(geometry2, material2);
oneState.position.set(0, -10, 0);
scene.add(oneState);

const oneDiv = document.createElement("div");
oneDiv.className = "label";
oneDiv.id = "stateLabel";
oneDiv.textContent = "|1>";

const oneLabelParameter = {
  visible: true,
};
const oneLabel = new CSS2DObject(oneDiv);
oneLabel.position.set(0, -23, 0);
oneLabel.center.set(2, 0);
grdState.add(oneLabel);

// Axes
const origin = new THREE.Vector3(0, 0, 0);
const length = 20;
const headLength = 3;
const headWidth = 0.5;

// Y-Axis
const yAxisParameter = {
  visible: true,
};
const ydir = new THREE.Vector3(1, 0, 0);
const ycolor = 0xffa31a;
const yAxis = new THREE.ArrowHelper(
  ydir,
  origin,
  length,
  ycolor,
  headLength,
  headWidth
);

const yLabelParameter = {
  visible: true,
};
const yDiv = document.createElement("div");
yDiv.className = "label";
yDiv.id = "yLabel";
yDiv.textContent = "y";

const yLabel = new CSS2DObject(yDiv);
yLabel.position.set(0, 21, 1);
yLabel.center.set(0, 1);
yAxis.add(yLabel);

// X-Axis
const xAxisParameter = {
  visible: true,
};
const xdir = new THREE.Vector3(0, 0, 1);
const xcolor = 0x1aa3ff;
const xAxis = new THREE.ArrowHelper(
  xdir,
  origin,
  length,
  xcolor,
  headLength,
  headWidth
);

const xLabelParameter = {
  visible: true,
};
const xDiv = document.createElement("div");
xDiv.className = "label";
xDiv.id = "xLabel";
xDiv.textContent = "x";

const xLabel = new CSS2DObject(xDiv);
xLabel.position.set(0, 21, 1);
xLabel.center.set(0, 2);
xAxis.add(xLabel);

// Z-Axis
const zAxisParameter = {
  visible: true,
};
const zdir = new THREE.Vector3(0, 0, 0);
const zcolor = 0xffff1a;
const zAxis = new THREE.ArrowHelper(
  zdir,
  origin,
  length,
  zcolor,
  headLength,
  headWidth
);

const zLabelParameter = {
  visible: true,
};
const zDiv = document.createElement("div");
zDiv.className = "label";
zDiv.id = "zLabel";
zDiv.textContent = "z";

const zLabel = new CSS2DObject(zDiv);
zLabel.position.set(1, 18, 0);
zLabel.center.set(0, 0);
zAxis.add(zLabel);

scene.add(yAxis, xAxis, zAxis);

// Pivot point
const geometry3 = new THREE.SphereGeometry(0, 0, 0);
const material3 = new THREE.MeshStandardMaterial();
const pivot = new THREE.Mesh(geometry3, material3);
pivot.position.set(0, 0, 0);
scene.add(pivot);

// Theta
const thetaData = {
  thetaLength: 0.7,
};

const geometry4 = new THREE.CircleGeometry(4, 32, 1.5708, 0.7);
const material4 = new THREE.MeshStandardMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide,
});
const theta = new THREE.Mesh(geometry4, material4);
pivot.add(theta);

// Reverse direction
theta.rotation.y = 3.14159;

const thetaDiv = document.querySelector("#thetaLabel");
const thetaLabel = new CSS2DObject(thetaDiv);
thetaLabel.center.set(-0.2, 1);
theta.add(thetaLabel);

// Phi
const phiData = {
  thetaLength: 0.9,
};

const geometry5 = new THREE.CircleGeometry(4, 32, 1.5708, 0.9);
const material5 = new THREE.MeshStandardMaterial({
  color: 0x00ff00,
  side: THREE.DoubleSide,
});
const phi = new THREE.Mesh(geometry5, material5);
pivot.add(phi);

const phiDiv = document.querySelector("#phiLabel");
const phiLabel = new CSS2DObject(phiDiv);
phiLabel.center.set(0.2, -0.6);
phi.add(phiLabel);

// Project angle on plane
phi.rotation.x = 1.5708;
phi.rotation.y = 3.14159;

// Psi - superposition point based on theta & phi
const geometry6 = new THREE.SphereGeometry(0.2, 24, 24);
const material6 = new THREE.MeshStandardMaterial({
  color: 0x000000,
});
const psi = new THREE.Mesh(geometry6, material6);

// x = r * cos(phi) * sin(theta)
psi.position.setZ(
  radius * Math.cos(phiData.thetaLength) * Math.sin(thetaData.thetaLength)
);

// y = r * sin(phi) * sin(theta)
psi.position.setX(
  radius * Math.sin(phiData.thetaLength) * Math.sin(thetaData.thetaLength)
);

// z = r * cos(theta)
psi.position.setY(radius * Math.cos(thetaData.thetaLength));

scene.add(psi);

const psiLabelParameter = {
  visible: true,
};
const psiDiv = document.querySelector("#psiLabel");
const psiLabel = new CSS2DObject(psiDiv);
psiLabel.center.set(-0.5, 0);
psi.add(psiLabel);

// Line connecting to Psi
const material7 = new THREE.LineBasicMaterial({
  color: 0x000000,
});

const points = [];
points.push(new THREE.Vector3());
points.push(new THREE.Vector3());
psi.getWorldPosition(points[0]);

const geometry7 = new THREE.BufferGeometry().setFromPoints(points);
const psiLine = new THREE.Line(geometry7, material7);
scene.add(psiLine);

/* GUI */
const gui = new dat.GUI();

const angleFolder = gui.addFolder("Adjust Angles");
angleFolder.open();

// Adjust Theta
angleFolder
  .add(thetaData, "thetaLength", 0, Math.PI)
  .name("&theta; Angle")
  .onChange(rerenderTheta);

// Adjust Phi
angleFolder
  .add(phiData, "thetaLength", 0, Math.PI * 2)
  .name("&phi; Angle")
  .onChange(rerenderPhi);

const gridFolder = gui.addFolder("Grids");
gridFolder.open();

// Toggle Grid
const gridVisible = gridFolder
  .add(gridParameter, "visible")
  .name("Cartesian Grid")
  .listen();
gridVisible.onChange(function (value) {
  gridHelper.visible = value;
});

// Toggle Polar Grid
const polarGridVisible = gridFolder
  .add(polarGridParameter, "visible")
  .name("Polar Grid")
  .listen();
polarGridVisible.onChange(function (value) {
  scene.add(polarGridHelper);
  polarGridHelper.visible = value;
  polarGridHelper.polarGridHelper.dispose();
});

const labelFolder = gui.addFolder("Labels");
const axesFolder = labelFolder.addFolder("Axes");

// Toggle Y Axis
const yAxisVisible = axesFolder
  .add(yAxisParameter, "visible")
  .name("Y Axis")
  .listen();
yAxisVisible.onChange(function (value) {
  yAxis.visible = value;
});

// Toggle Y Label
const yLabelVisible = axesFolder
  .add(yLabelParameter, "visible")
  .name("Y Label")
  .listen();
yLabelVisible.onChange(function (value) {
  yLabel.visible = value;
});

// Toggle X Axis
const xAxisVisible = axesFolder
  .add(xAxisParameter, "visible")
  .name("X Axis")
  .listen();
xAxisVisible.onChange(function (value) {
  xAxis.visible = value;
});

// Toggle X Label
const xLabelVisible = axesFolder
  .add(xLabelParameter, "visible")
  .name("X Label")
  .listen();
xLabelVisible.onChange(function (value) {
  xLabel.visible = value;
});

// Toggle Z Axis
const zAxisVisible = axesFolder
  .add(zAxisParameter, "visible")
  .name("Z Axis")
  .listen();
zAxisVisible.onChange(function (value) {
  zAxis.visible = value;
});

// Toggle Z Label
const zLabelVisible = axesFolder
  .add(zLabelParameter, "visible")
  .name("Z Label")
  .listen();
zLabelVisible.onChange(function (value) {
  zLabel.visible = value;
});

const statesFolder = labelFolder.addFolder("States");

// Toggle Ground State
const grdStateVisible = statesFolder
  .add(grdStateParameter, "visible")
  .name("|0&rangle; State")
  .listen();
grdStateVisible.onChange(function (value) {
  grdState.visible = value;
});

// Toggle Ground State Label
const grdLabelVisible = statesFolder
  .add(grdLabelParameter, "visible")
  .name("|0&rangle; Label")
  .listen();
grdLabelVisible.onChange(function (value) {
  grdLabel.visible = value;
});

// Toggle One State
const oneStateVisible = statesFolder
  .add(oneStateParameter, "visible")
  .name("|1&rangle; State")
  .listen();
oneStateVisible.onChange(function (value) {
  oneState.visible = value;
});

// Toggle One State Label
const oneLabelVisible = statesFolder
  .add(oneLabelParameter, "visible")
  .name("1&rangle; Label")
  .listen();
oneLabelVisible.onChange(function (value) {
  oneLabel.visible = value;
});

// Toggle Psi Label
const psiLabelVisible = statesFolder
  .add(psiLabelParameter, "visible")
  .name("&psi; Label")
  .listen();
psiLabelVisible.onChange(function (value) {
  psiLabel.visible = value;
});

function rerenderTheta() {
  const newGeometry = new THREE.CircleGeometry(
    4,
    32,
    1.5708,
    thetaData.thetaLength
  );
  theta.geometry.dispose();
  theta.geometry = newGeometry;
  rerenderPsi();
  rerenderPsiLine();
}

function rerenderPhi() {
  const newGeometry = new THREE.CircleGeometry(
    4,
    32,
    1.5708,
    phiData.thetaLength
  );
  phi.geometry.dispose();
  phi.geometry = newGeometry;
  rerenderPsi();
  rerenderPsiLine();
}

function rerenderPsi() {
  psi.position.setZ(
    radius * Math.cos(phiData.thetaLength) * Math.sin(thetaData.thetaLength)
  );

  psi.position.setX(
    radius * Math.sin(phiData.thetaLength) * Math.sin(thetaData.thetaLength)
  );

  psi.position.setY(radius * Math.cos(thetaData.thetaLength));
}

function rerenderPsiLine() {
  psi.getWorldPosition(points[0]);
  const newGeometry = new THREE.BufferGeometry().setFromPoints(points);
  psiLine.geometry.dispose();
  psiLine.geometry = newGeometry;
}

// Instantiate OrbitControls class
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 5;
controls.maxDistance = 100;

// Instantiate CSS2DRenderer class
const labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(size.width, size.height);
labelRenderer.domElement.style.position = "absolute";
labelRenderer.domElement.style.top = "0px";
document.body.appendChild(labelRenderer.domElement);
labelRenderer.domElement.style.pointerEvents = "none";

window.addEventListener("resize", () => {
  // Update size
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  // Update camera
  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);

  labelRenderer.setSize(size.width, size.height);
});

// Infinite loop to call render function
// Draws graphics
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
  labelRenderer.render(scene, camera);
}

animate();

/* Info Box */
$(function () {
  $("#infoBox")
    .css({
      background: "rgba(255,255,255,0.5)",
    })
    .dialog({
      autoOpen: false,
      show: { effect: "fade", duration: 500 },
      hide: { effect: "fade", duration: 500 },
    });

  $("#infoButton")
    .text("") // sets text to empty
    .css({
      "z-index": "2",
      background: "rgba(0,0,0,0)",
      opacity: "0.9",
      position: "absolute",
      top: "4px",
      left: "4px",
    }) // adds CSS
    .append("<img width='32' height='32' src='/icon-info.png'/>")
    .button()
    .click(function () {
      $("#infoBox").dialog("open");
    });
});
