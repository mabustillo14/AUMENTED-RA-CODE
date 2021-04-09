
var instructionsOverlay = document.getElementById("instructions");
var instructionsButton = document.querySelector("toggle-instructions");

var menuOverlay = document.getElementById("menu");
var menuButton = document.querySelector("toggle-menu");

var descriptionOverlay = document.getElementById("description");
var descriptionButton = document.querySelector("toggle-description");

var zoomMenu = document.querySelector("zoom-icon");
var zoomMenuContainer = document.getElementById("zoom-container");

var camMenu = document.querySelector("camera-icon");
var camMenuContainer = document.getElementById("cam-container");

function hideInstructionsOverlay() {
  instructionsOverlay.toggle();
}

function hideDescriptionOverlay() {
  descriptionOverlay.toggle();
}

function hideMenuOverlay() {
  menuOverlay.toggle();
}

function handleZoomMenu(e) {
  zoomMenuContainer.classList.toggle("hide");
  zoomMenu.isActive = !zoomMenu.isActive;

  if (camMenu.isActive) {
    camMenu.isActive = false;
    camMenuContainer.classList.add("hide");
  }
}

function handleCamMenu(e) {
  camMenuContainer.classList.toggle("hide");
  camMenu.isActive = !camMenu.isActive;

  if (zoomMenu.isActive) {
    zoomMenu.isActive = false;
    zoomMenuContainer.classList.add("hide");
  }
}

instructionsButton.addEventListener("toggleInstructions", hideInstructionsOverlay);
descriptionButton.addEventListener("toggleDescription", hideDescriptionOverlay);
menuButton.addEventListener("toggleMenu", hideMenuOverlay);





import * as CANNON from "https://raw.githack.com/mabustillo14/AUMENTED-RA-CODE/master/LIBRERIAS/cannon-es.js";
import {
  setupPdb,
  clearGroup,
  createSpheres,
  createSticks,
  radiusfactor1,
  radiusfactor2,
} from "https://raw.githack.com/mabustillo14/AUMENTED-RA-CODE/master/ARCHIVO .JS/3Dutils.js";

var scene, camera, renderer, clock, deltaTime, totalTime;
var arToolkitSource, arToolkitContext;
var patternArray, markerRootArray, markerGroupArray;
var sceneGroup, stickGroup, spheresGroup;
var sceneGroup2;
var pdb;

var startAR = document.getElementById("start-ar");
var flipGraphics = document.querySelector("flip-graphics");
var flipVideo = document.querySelector("flip-video");
var scaleUp = document.getElementById("scale-up");
var scaleDown = document.getElementById("scale-down");
var reset = document.querySelector("reset-activity");
var tempControls = document.querySelectorAll("temp-control");
var stopTemp = document.querySelector("stop-temp");
var playTemp = document.querySelector("play-temp");
var renderType = document.querySelector("render-type-icon");

var temperature = 0;
var high = 100;
var medium = 50;
var low = 10;
var defaultTemp = 200;
var prevTemp = 0;

var atomMeshes = [];
var atomBodies = [];
var bonds = [];
var constraints = [];
var atoms = 0;

startAR.addEventListener("click", handleClick);
flipGraphics.addEventListener("flipGraphics", handleFlip);
flipVideo.addEventListener("flipCamera", handleFlip);
scaleUp.addEventListener("scaleGraphics", handleScale);
scaleDown.addEventListener("scaleGraphics", handleScale);
reset.addEventListener("resetActivity", handleReset);
stopTemp.addEventListener("stopTemp", handleStopTemp);
playTemp.addEventListener("playTemp", handlePlayTemp);
renderType.addEventListener("click", handleRenderType);
window.addEventListener("camera-change", () => {
  handleFlip();
});
tempControls.forEach(function (item) {
  item.addEventListener("updateTemp", handleTempControls);
});

renderType.isActive = true;

var world = new CANNON.World();
world.gravity.set(0, 0, 0);
world.broadphase = new CANNON.NaiveBroadphase();
world.solver.iterations = 10;

initialize();
animate();

function initialize() {
  scene = new THREE.Scene();

  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);

  camera = new THREE.PerspectiveCamera();
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    logarithmicDepthBuffer: true,
  });
  renderer.setClearColor(new THREE.Color("lightgrey"), 0);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";
  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  deltaTime = 0;
  totalTime = 0;

  // setup arToolkitSource
  arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
  });

  function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  }

  arToolkitSource.init(function onReady() {
    setTimeout(function () {
      onResize();
    }, 1000);
  });

  // handle resize event
  window.addEventListener("resize", function () {
    onResize();
  });

  // create atToolkitContext
  arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "data/camera_para.dat",
    detectionMode: "mono",
  });

  // copy projection matrix to camera when initialization complete
  arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  // setup markerRoots
  markerRootArray = [];
  markerGroupArray = [];
  patternArray = [
    "hiro",
    "letterB",
    "letterC",
    "letterD",
    "letterF",
    "kanji",
  ];

  let rotationArray = [
    new THREE.Vector3(-Math.PI / 2, 0, 0),
    new THREE.Vector3(0, -Math.PI / 2, Math.PI / 2),
    new THREE.Vector3(Math.PI / 2, 0, Math.PI),
    new THREE.Vector3(-Math.PI / 2, Math.PI / 2, 0),
    new THREE.Vector3(Math.PI, 0, 0),
    new THREE.Vector3(0, 0, 0),
  ];

  for (let i = 0; i < 6; i++) {
    let markerRoot = new THREE.Group();
    markerRootArray.push(markerRoot);
    scene.add(markerRoot);
    let markerControls = new THREEx.ArMarkerControls(
      arToolkitContext,
      markerRoot,
      {
        type: "pattern",
        patternUrl: "data/" + patternArray[i] + ".patt",
      }
    );

    let markerGroup = new THREE.Group();
    markerGroupArray.push(markerGroup);
    markerGroup.position.y = -1.25 / 2;
    markerGroup.rotation.setFromVector3(rotationArray[i]);

    markerRoot.add(markerGroup);
  }

  // setup scene
  sceneGroup = new THREE.Group();
  stickGroup = new THREE.Group();
  spheresGroup = new THREE.Group();

  // a 1x1x1 cube model with scale factor 1.25 fills up the physical cube
  sceneGroup.scale.set(1.25 / 2, 1.25 / 2, 1.25 / 2);

  let pointLight = new THREE.PointLight(0xffffff, 1, 50);
  pointLight.position.set(0.5, 3, 2);

  scene.add(pointLight);
}

function update() {
  // update artoolkit on every frame
  if (arToolkitSource.ready !== false) {
    arToolkitContext.update(arToolkitSource.domElement);
  }

  for (let i = 0; i < 6; i++) {
    if (markerRootArray[i].visible) {
      markerGroupArray[i].add(sceneGroup);
      break;
    }
  }
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;
  world.step(1 / 600);
  updatePhysics();
  update();
  render();
}

function updatePhysics() {
  world.step(1 / 600);

  var velsum_expected = Math.sqrt(temperature) * atoms;

  var velsum = 0;
  var sumax = 0;
  var sumay = 0;
  var sumaz = 0;
  // var sumaxr = 0;
  // var sumayr = 0;
  // var sumazr = 0;

  for (var i = 0; i < atomMeshes.length; i++) {
    sumax = sumax + atomBodies[i].position.x;
    sumay = sumay + atomBodies[i].position.y;
    sumaz = sumaz + atomBodies[i].position.z;
    // sumaxr = sumaxr + world.bodies[i].quaternion.x;
    // sumayr = sumayr + world.bodies[i].quaternion.y;
    // sumazr = sumazr + world.bodies[i].quaternion.z;
  }

  for (var i = 0; i < atomMeshes.length; i++) {
    atomBodies[i].position.x =
      atomBodies[i].position.x - sumax / atomMeshes.length;
    atomBodies[i].position.y =
      atomBodies[i].position.y - sumay / atomMeshes.length;
    atomBodies[i].position.z =
      atomBodies[i].position.z - sumaz / atomMeshes.length;
  }

  for (var i = 0; i < atomMeshes.length; i++) {
    atomMeshes[i].position.copy(atomBodies[i].position);
    atomMeshes[i].quaternion.copy(atomBodies[i].quaternion);

    atomBodies[i].velocity.x =
      atomBodies[i].velocity.x + 10 * Math.random(1) - 5;
    atomBodies[i].velocity.y =
      atomBodies[i].velocity.y + 10 * Math.random(1) - 5;
    atomBodies[i].velocity.z =
      atomBodies[i].velocity.z + 10 * Math.random(1) - 5;

    velsum =
      velsum +
      Math.sqrt(
        Math.pow(atomBodies[i].velocity.x, 2) +
          Math.pow(atomBodies[i].velocity.y, 2) +
          Math.pow(atomBodies[i].velocity.z, 2)
      );
  }

  for (var i = 0; i < atomMeshes.length; i++) {
    atomBodies[i].velocity.x =
      (atomBodies[i].velocity.x / velsum) * velsum_expected;
    atomBodies[i].velocity.y =
      (atomBodies[i].velocity.y / velsum) * velsum_expected;
    atomBodies[i].velocity.z =
      (atomBodies[i].velocity.z / velsum) * velsum_expected;
  }

  bonds.forEach(function (bond) {
    var B = new THREE.Vector3(
      atomMeshes[bond.atomA].position.x,
      atomMeshes[bond.atomA].position.y,
      atomMeshes[bond.atomA].position.z
    );

    var A = new THREE.Vector3(
      atomMeshes[bond.atomA].position.x / 2 +
        atomMeshes[bond.atomB].position.x / 2,
      atomMeshes[bond.atomA].position.y / 2 +
        atomMeshes[bond.atomB].position.y / 2,
      atomMeshes[bond.atomA].position.z / 2 +
        atomMeshes[bond.atomB].position.z / 2
    );

    var C = new THREE.Vector3(
      atomMeshes[bond.atomA].position.x / 2 +
        atomMeshes[bond.atomB].position.x / 2,
      atomMeshes[bond.atomA].position.y / 2 +
        atomMeshes[bond.atomB].position.y / 2,
      atomMeshes[bond.atomA].position.z / 2 +
        atomMeshes[bond.atomB].position.z / 2
    );
    var D = new THREE.Vector3(
      atomMeshes[bond.atomB].position.x,
      atomMeshes[bond.atomB].position.y,
      atomMeshes[bond.atomB].position.z
    );

    var vec = B.clone();
    vec.sub(A);
    var h = vec.length();
    vec.normalize();
    var quaternion = new THREE.Quaternion();
    quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec);
    bond.sticks[0].position.set(0, 0, 0);
    bond.sticks[0].rotation.set(0, 0, 0);
    bond.sticks[0].translateOnAxis(0, h / 2, 0);
    bond.sticks[0].applyQuaternion(quaternion);
    bond.sticks[0].position.set(A.x, A.y, A.z);

    var vec2 = D.clone();
    vec2.sub(C);
    var h2 = vec.length();
    vec2.normalize();
    var quaternion2 = new THREE.Quaternion();
    quaternion2.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec2);
    bond.sticks[1].position.set(0, 0, 0);
    bond.sticks[1].rotation.set(0, 0, 0);
    bond.sticks[1].translateOnAxis(0, h2 / 2, 0);
    bond.sticks[1].applyQuaternion(quaternion2);
    bond.sticks[1].position.set(C.x, C.y, C.z);
  });
}

function loadPdb(rawPdb) {
  pdb = setupPdb(rawPdb);
  atoms = pdb.atoms;

  clearPhysics(atomBodies, constraints);
  clearGroup(stickGroup);
  clearGroup(spheresGroup);

  console.time("VMK");

  [spheresGroup, atomMeshes, atomBodies] = createSpheres(
    pdb,
    renderType.isActive
  );

  atomBodies.forEach(function (sphere) {
    world.addBody(sphere);
  });
  sceneGroup.add(spheresGroup);

  [stickGroup, bonds, constraints] = createSticks(pdb, atomBodies);
  sceneGroup.add(stickGroup);
  constraints.forEach(function (constraint) {
    world.addConstraint(constraint);
  });

  console.timeEnd("VMK");

  if (window.innerWidth >= 768) {
    handleFlip();
  }
}

function clearPhysics(bodies, constraints) {
  // var bodies = world.bodies;
  // var cs = world.constraints;

  for (var i = bodies.length - 1; i >= 0; i--) {
    world.removeBody(bodies[i]);
  }

  for (var i = constraints.length - 1; i >= 0; i--) {
    world.removeConstraint(constraints[i]);
  }
}

function handleClick(e) {
  var pdbInserted = pdbText.value;

  if (pdbInserted.length > 0) {
    loadPdb(pdbInserted);
    handleMenu(e);
    handleTempMenu(e);
  } else {
    console.log("No pdb!");
  }
}

function handleFlip(e) {
  for (var i = 0; i < atomMeshes.length; i++) {
    atomBodies[i].position.x = -atomBodies[i].position.x;
    // world.bodies[i].position.y = - world.bodies[i].position.y;
    // world.bodies[i].position.z = - world.bodies[i].position.z;
  }
}

function handleScale(e) {
  if (e.detail === "up") {
    sceneGroup.scale.multiplyScalar(1.5);
  } else {
    sceneGroup.scale.multiplyScalar(0.6667);
  }
}

function handleReset(e) {
  atomMeshes = [];
  atomBodies = [];
  constraints = [];
  bonds = [];
  atoms = 0;
  temperature = 0;

  clearPhysics(atomBodies, constraints);
  clearGroup(stickGroup);
  clearGroup(spheresGroup);

  sceneGroup.scale.set(1.25 / 2, 1.25 / 2, 1.25 / 2);

  handleMenu();
}

function handleTempControls(e) {
  var type = e.detail.type;
  var size = e.detail.size;

  var tempOffset;

  if (size === "big") {
    tempOffset = high;
  } else if (size === "medium") {
    tempOffset = medium;
  } else {
    tempOffset = low;
  }

  if (type === "increase") {
    temperature = temperature + tempOffset;
  } else {
    var newTemp = temperature - tempOffset;
    temperature = newTemp < 0 ? 0 : newTemp;
  }

  prevTemp = temperature;
}

function handleStopTemp(e) {
  prevTemp = temperature;
  temperature = 0;
}

function handlePlayTemp(e) {
  temperature = prevTemp === 0 ? defaultTemp : prevTemp;
  prevTemp = temperature;
}

function handleRenderType(e) {
  renderType.isActive = !renderType.isActive;

  if (!renderType.isActive) {
    stickGroup.visible = false;

    spheresGroup.children.forEach(function (atom, index) {
      var scale = radiusfactor2 * elementradii[pdb.elements[index]];
      atom.scale.setScalar(scale);
    });
  } else {
    stickGroup.visible = true;

    spheresGroup.children.forEach(function (atom, index) {
      var scale = radiusfactor1 * elementradii[pdb.elements[index]];
      atom.scale.setScalar(scale);
    });
  }
}


var selectMenu = document.getElementById("select-pdb");
var pdbText = document.getElementById("pdb-text");
var pdbInput = document.getElementById("pdb-input");
var mkMenu = document.querySelector("enable-mk-menu");
var menuContainer = document.getElementById("mk-menu");
var closeMenu = document.getElementById("close-menu");
var uploadLabel = document.getElementById("upload-label");

var requestURL = "https://raw.githack.com/mabustillo14/AUMENTED-RA-CODE/master/LIBRERIAS/PDB.json";
var request = new XMLHttpRequest();
var pdbs;

// Modeling kit menu is active by default
mkMenu.isActive = true;

// Get PDB JSON
request.open("GET", requestURL);
request.responseType = "json";
request.send();

request.onload = function () {
  pdbs = request.response;
  populateMenu(pdbs);
};

// Set select options after getting PDBs from JSON
function populateMenu(pdbs) {
  var categories = Object.keys(pdbs);
  categories.forEach(function (category, index) {
    var optionGroup = document.createElement("optgroup");
    optionGroup.label = category;
    var examples = Object.keys(pdbs[category]);
    examples.forEach(function (item, index) {
      var optionItem = document.createElement("option");
      optionItem.textContent = item;
      optionItem.value = item;
      optionItem.classList.add("option");
      optionGroup.appendChild(optionItem);
    });
    selectMenu.appendChild(optionGroup);
  })
}

// Set PDB on text area after selection
function handleChange(e) {
  var selectedPdb = selectMenu.options[selectMenu.selectedIndex];
  var selectedGroup = selectedPdb.parentElement.label;
  var rawPdb = pdbs[selectedGroup][selectedPdb.value]
  pdbText.value = rawPdb;
}

// Handle file upload and set text area if ok
function handleUpload(e) {
  var input = e.target;
  var reader = new FileReader();

  reader.onload = function () {
    pdbText.value = reader.result;
  };

  reader.readAsText(input.files[0]);
}

// Handle MK Menu
function handleMenu(e) {
  menuContainer.classList.toggle("hide");
  mkMenu.isActive = !mkMenu.isActive;
  if (tempMenu.isActive) {
    tempMenu.isActive = false;
    tempMenuContainer.classList.add("hide");
  }
  if (zoomMenu.isActive) {
    zoomMenu.isActive = false;
    zoomMenuContainer.classList.add("hide");
  }
  if (camMenu.isActive) {
    camMenu.isActive = false;
    camMenuContainer.classList.add("hide");
  }
}

selectMenu.addEventListener("change", handleChange);
pdbInput.addEventListener("change", handleUpload);
mkMenu.addEventListener("click", handleMenu);
closeMenu.addEventListener("click", handleMenu);
uploadLabel.addEventListener("click", function (e) {
  pdbInput.click();
})








import * as CANNON from "https://raw.githack.com/mabustillo14/AUMENTED-RA-CODE/master/LIBRERIAS/cannon-es.js";
var SIMPLE = 0.12;
var DOUBLE = 0.2;
var TRIPLE = 0.25;

var CONSTRAINT_1 = 1000;
var CONSTRAINT_2 = 10;
var CONSTRAINT_3 = 100;

var radiusfactor1 = 0.35;
var radiusfactor2 = 1.4;

var sphereGeometry = new THREE.SphereBufferGeometry(1, 32, 16);

/******************  3D utils *************************/

// This function checks if one two elements are N, C or O
function checkNCO(elementA, elementB) {
return (
  (elementA == 5 || elementA == 6 || elementA == 7) &&
  (elementB == 5 || elementB == 6 || elementB == 7)
);
}

// This function returns 1.2 * (A + B)^2
// A and B are element radius
function radiiSum(elementA, elementB) {
return 1.2 * Math.pow(elementA + elementB, 2);
}

// This function creates a 3D cylinder from A to B
function cylindricalSegment(A, B, radius, material) {
var vec = B.clone();
vec.sub(A);
var h = vec.length();
vec.normalize();
var quaternion = new THREE.Quaternion();
quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), vec);
var geometry = new THREE.CylinderBufferGeometry(radius, radius, h, 32);
geometry.translate(0, h / 2, 0);
var cylinder = new THREE.Mesh(geometry, material);
cylinder.applyQuaternion(quaternion);
cylinder.position.set(A.x, A.y, A.z);
return cylinder;
}

// This function receives raw PDB string and returns atoms & cordinates
function setupPdb(rawPdb) {
var pdb = {
  xCoords: [],
  yCoords: [],
  zCoords: [],
  resnos: [],
  elements: [],
  bonds: {},
  allBonds: {},
  atoms: 0,
  xAvg: 0,
  yAvg: 0,
  zAvg: 0,
};

var lines = rawPdb.split("\n");

// Read all lines, when a line starts with ATOM or HETATM
// then it encodes an atom whose properties are read
for (var i = 0; i < lines.length; i++) {
  if (
    lines[i].substring(0, 4) == "ATOM" ||
    lines[i].substring(0, 6) == "HETATM"
  ) {
    pdb.xCoords.push(parseFloat(lines[i].substring(30, 38)));
    pdb.yCoords.push(parseFloat(lines[i].substring(38, 46)));
    pdb.zCoords.push(parseFloat(lines[i].substring(46, 54)));
    pdb.resnos.push(parseFloat(lines[i].substring(22, 26)));
    pdb.xAvg = pdb.xAvg + pdb.xCoords[pdb.atoms];
    pdb.yAvg = pdb.yAvg + pdb.yCoords[pdb.atoms];
    pdb.zAvg = pdb.zAvg + pdb.zCoords[pdb.atoms];
    var element = lines[i].substring(76, 79).trim().toUpperCase();
    for (var j = 0; j < elementNames.length; j++) {
      if (element == elementNames[j]) {
        pdb.elements[pdb.atoms] = j;
        break;
      }
    }
    pdb.atoms++;
  }
}

//need the average x, y and z values to center the molecule at 0,0,0
pdb.xAvg = pdb.xAvg / pdb.atoms;
pdb.yAvg = pdb.yAvg / pdb.atoms;
pdb.zAvg = pdb.zAvg / pdb.atoms;

var bonds = getBonds(pdb);

// Here we make a Deep clone of bonds object so we have
// all bonds for each atom, not only the ones we will draw
// otherwise we will draw them twice
var allBonds = JSON.parse(JSON.stringify(bonds));

pdb.bonds = bonds;
pdb.allBonds = allBonds;

var bondKeys = Object.keys(pdb.bonds);

bondKeys.forEach(function (atom) {
  pdb.allBonds[atom].forEach(function (bondedAtom) {
    if (!pdb.allBonds[bondedAtom].includes(atom)) {
      pdb.allBonds[bondedAtom].push(atom);
    }
  });
});

return pdb;
}

// This function calculate bonds between atoms
// Returns only atoms to draw
function getBonds(pdb) {
var bonds = {};
for (var i = 0; i < pdb.atoms; i++) {
  var currentAtomI = `atom${i + 1}`;

  var distsqr;
  var bondedAtoms = [];

  for (var j = i + 1; j < pdb.atoms; j++) {
    var currentAtomJ = `atom${j + 1}`;

    //get distance squared
    distsqr =
      Math.pow(pdb.xCoords[i] - pdb.xCoords[j], 2) +
      Math.pow(pdb.yCoords[i] - pdb.yCoords[j], 2) +
      Math.pow(pdb.zCoords[i] - pdb.zCoords[j], 2);

    //if distance squared is less than 1.2 x the sum of the radii squared, add a bond
    var radSum = radiiSum(
      elementradii[pdb.elements[i]],
      elementradii[pdb.elements[j]]
    );

    if (distsqr < radSum) {
      bondedAtoms.push(currentAtomJ);
    }
  }
  bonds[currentAtomI] = bondedAtoms;
}
return bonds;
}

function createSticks(pdb, bodies) {
var bondKeys = Object.keys(pdb.bonds);
var sticks = new THREE.Group();
var bonds = [];
var constraints = [];
var atomPairs = [];
var doubleBondAtomPairs = [];

bondKeys.forEach(function (atom, atomIndex) {
  //point1 is the first atom (i), point3 is the second atom (j)
  //point2 is at the center in-between atoms i and j
  //then the first half of the bond is from sphere 1 to 2 and the
  //second half of the bond is from point2 to point3

  var point1 = new THREE.Vector3(
    -(pdb.xCoords[atomIndex] - pdb.xAvg),
    pdb.yCoords[atomIndex] - pdb.yAvg,
    pdb.zCoords[atomIndex] - pdb.zAvg
  );

  pdb.bonds[atom].forEach(function (bondedAtom) {
    var bondedAtomIndex = bondKeys.indexOf(bondedAtom);

    var point2 = new THREE.Vector3(
      -(
        pdb.xCoords[bondedAtomIndex] / 2 +
        pdb.xCoords[atomIndex] / 2 -
        pdb.xAvg
      ),
      pdb.yCoords[bondedAtomIndex] / 2 +
        pdb.yCoords[atomIndex] / 2 -
        pdb.yAvg,
      pdb.zCoords[bondedAtomIndex] / 2 + pdb.zCoords[atomIndex] / 2 - pdb.zAvg
    );

    var point3 = new THREE.Vector3(
      -(pdb.xCoords[bondedAtomIndex] - pdb.xAvg),
      pdb.yCoords[bondedAtomIndex] - pdb.yAvg,
      pdb.zCoords[bondedAtomIndex] - pdb.zAvg
    );

    var radius = SIMPLE;
    var atom1Bonds = pdb.allBonds[atom].length;
    var atom2Bonds = pdb.allBonds[bondedAtom].length;

    /******************  Bonde rules for C *************************/
    if (
      pdb.elements[atomIndex] === 5 &&
      pdb.elements[bondedAtomIndex] === 5
    ) {
      if (atom1Bonds === 4 && atom2Bonds === 4) {
        radius = SIMPLE;
      }

      if (atom1Bonds === 3 && atom2Bonds === 3) {
        radius = DOUBLE;
      }

      if (atom1Bonds === 2 && atom2Bonds === 2) {
        radius = TRIPLE;
      }
    }

    /******************  Bonde rules for O *************************/

    // One of both atoms is O and have 1 bonded atom (TERMINAL) => DOUBLE
    // Otherwise is simple
    if (
      (pdb.elements[atomIndex] === 7 && atom1Bonds === 1) ||
      (pdb.elements[bondedAtomIndex] === 7 && atom2Bonds === 1)
    ) {
      radius = DOUBLE;
    }

    /******************  Bonde rules for N *************************/

    // One atom is N and have 4 bonded atoms
    if (
      (pdb.elements[atomIndex] === 6 && atom1Bonds === 4) ||
      (pdb.elements[bondedAtomIndex] === 6 && atom2Bonds === 4)
    ) {
      radius = SIMPLE;
    }

    // One atom is N with 3 bonded atoms
    // The other atom is C with 4 bonded atoms
    if (
      (pdb.elements[atomIndex] === 6 &&
        atom1Bonds === 3 &&
        pdb.elements[bondedAtomIndex] === 5 &&
        atom2Bonds === 4) ||
      (pdb.elements[atomIndex] === 5 &&
        atom1Bonds === 4 &&
        pdb.elements[bondedAtomIndex] === 6 &&
        atom2Bonds === 3)
    ) {
      radius = SIMPLE;
    }

    // One atom is N with 3 bonded atoms
    // The other atom is O with 2 bonded atoms
    if (
      (pdb.elements[atomIndex] === 6 &&
        atom1Bonds === 3 &&
        pdb.elements[bondedAtomIndex] === 7 &&
        atom2Bonds === 2) ||
      (pdb.elements[atomIndex] === 7 &&
        atom1Bonds === 2 &&
        pdb.elements[bondedAtomIndex] === 6 &&
        atom2Bonds === 3)
    ) {
      radius = SIMPLE;
    }

    // One atom is N with 3 bonded atoms
    // The other atom is C with 3 bonded atoms
    if (
      (pdb.elements[atomIndex] === 6 &&
        atom1Bonds === 3 &&
        pdb.elements[bondedAtomIndex] === 5 &&
        atom2Bonds === 3) ||
      (pdb.elements[atomIndex] === 5 &&
        atom1Bonds === 3 &&
        pdb.elements[bondedAtomIndex] === 6 &&
        atom2Bonds === 3)
    ) {
      radius = DOUBLE;
    }

    // One atom is N with 2 bonded atoms
    // The other atom is C with 3 bonded atoms
    if (
      (pdb.elements[atomIndex] === 6 &&
        atom1Bonds === 2 &&
        pdb.elements[bondedAtomIndex] === 5 &&
        atom2Bonds === 3) ||
      (pdb.elements[atomIndex] === 5 &&
        atom1Bonds === 3 &&
        pdb.elements[bondedAtomIndex] === 6 &&
        atom2Bonds === 2)
    ) {
      radius = DOUBLE;
    }

    // One atom is N and have 1 bonded atom (TERMINAL) => TRIPLE
    if (
      (pdb.elements[atomIndex] === 6 && atom1Bonds === 1) ||
      (pdb.elements[bondedAtomIndex] === 6 && atom2Bonds === 1)
    ) {
      radius = TRIPLE;
    }

    // Both atoms are N with two bonded atoms
    if (
      pdb.elements[atomIndex] === 6 &&
      atom1Bonds === 2 &&
      pdb.elements[bondedAtomIndex] === 6 &&
      atom2Bonds === 2
    ) {
      radius = DOUBLE;
    }

    // One of both atoms is H and have 1 bonded atom (TERMINAL) => SIMPLE
    // Otherwise is simple
    if (
      (pdb.elements[atomIndex] === 0 && atom1Bonds === 1) ||
      (pdb.elements[bondedAtomIndex] === 0 && atom2Bonds === 1)
    ) {
      radius = SIMPLE;
    }

    // This is the default contraint between bonded atoms
    var c = new CANNON.DistanceConstraint(
      bodies[atomIndex],
      bodies[bondedAtomIndex],
      undefined,
      CONSTRAINT_1
    );

    constraints.push(c);

    // Create default pairs of atoms for further constraint building
    for (var i = 0; i < atom1Bonds; i++) {
      if (pdb.allBonds[atom][i] !== bondedAtom) {
        var myAtom = pdb.allBonds[atom][i];
        var c = [bondKeys.indexOf(myAtom), bondedAtomIndex].sort();
        atomPairs.push(c);
      }
    }

    for (var i = 0; i < atom2Bonds; i++) {
      if (pdb.allBonds[bondedAtom][i] !== atom) {
        var myAtom = pdb.allBonds[bondedAtom][i];
        var c = [bondKeys.indexOf(myAtom), atomIndex].sort();
        atomPairs.push(c);
      }
    }

    if (radius === DOUBLE && atom1Bonds > 1 && atom2Bonds > 1) {
      for (var i = 0; i < atom1Bonds; i++) {
        var currentAtomI = pdb.allBonds[atom][i];
        if (currentAtomI !== bondedAtom) {
          for (var j = 0; j < atom2Bonds; j++) {
            var currentAtomJ = pdb.allBonds[bondedAtom][j];
            if (currentAtomJ !== atom) {
              var c = [bondKeys.indexOf(currentAtomI), bondKeys.indexOf(currentAtomJ)].sort();
              doubleBondAtomPairs.push(c);
            }
          }
        }
      }
    }

    var bond1 = cylindricalSegment(
      point2,
      point1,
      radius,
      new THREE.MeshLambertMaterial({
        color: elementColors[pdb.elements[atomIndex]],
      })
    );
    var bond2 = cylindricalSegment(
      point2,
      point3,
      radius,
      new THREE.MeshLambertMaterial({
        color: elementColors[pdb.elements[bondedAtomIndex]],
      })
    );

    sticks.add(bond1);
    sticks.add(bond2);

    bonds.push({
      atomA: atomIndex,
      atomB: bondedAtomIndex,
      sticks: [bond1, bond2],
    });
  });
});

// Convert atom pairs to strings for easily removing duplicates
var stringArray = atomPairs.map(JSON.stringify);
var uniqueStringArray = new Set(stringArray);
var uniqueConstraints = Array.from(uniqueStringArray, JSON.parse);

var defaultConstraints = [];

uniqueConstraints.forEach(function (atomPair) {
  var constraint = new CANNON.DistanceConstraint(
    bodies[atomPair[0]],
    bodies[atomPair[1]],
    undefined,
    CONSTRAINT_2
  );
  defaultConstraints.push(constraint);
});

// Convert atom pairs from double bonds to strings for removing duplicates
var strings = doubleBondAtomPairs.map(JSON.stringify);
var uniqueStrings = new Set(strings);
var uniqueConsts = Array.from(uniqueStrings, JSON.parse);

var constraintsFromDoubleBonds = [];

uniqueConsts.forEach(function (atomPair) {
  var constraint = new CANNON.DistanceConstraint(
    bodies[atomPair[0]],
    bodies[atomPair[1]],
    undefined,
    CONSTRAINT_3
  );
  constraintsFromDoubleBonds.push(constraint);
});

return [sticks, bonds, [...constraints, ...defaultConstraints, ...constraintsFromDoubleBonds]];
}

function createSpheres(pdb, renderType) {
//this loop will create the spheres to display the atoms at the defined radius
//and the actual physical cannon spheres
var spheres = new THREE.Group();
var meshes = [];
var bodies = [];

var radiusFactor = renderType ? radiusfactor1 : radiusfactor2;

for (var i = 0; i < pdb.atoms; i++) {
  var sphereRadius = radiusFactor * elementradii[pdb.elements[i]];
  var sphereMesh = new THREE.Mesh(
    sphereGeometry,
    new THREE.MeshLambertMaterial({ color: elementColors[pdb.elements[i]] })
  );

  sphereMesh.scale.setScalar(sphereRadius);

  sphereMesh.position.x = pdb.xCoords[i] - pdb.xAvg;
  sphereMesh.position.y = pdb.yCoords[i] - pdb.yAvg;
  sphereMesh.position.z = pdb.zCoords[i] - pdb.zAvg;
  spheres.add(sphereMesh);
  meshes.push(sphereMesh);

  var sphereShape = new CANNON.Sphere(0.5 * elementradii[pdb.elements[i]]);
  var sphereBody = new CANNON.Body({
    mass: elementmasses[pdb.elements[i]],
    shape: sphereShape,
  });
  sphereBody.position.set(
    sphereMesh.position.x,
    sphereMesh.position.y,
    sphereMesh.position.z
  );
  sphereBody.velocity.x = 0;
  sphereBody.velocity.y = 0;
  sphereBody.velocity.z = 0;
  bodies.push(sphereBody);
}
return [spheres, meshes, bodies];
}

function clearGroup(group) {
var length = group.children.length;

for (var i = length - 1; i >= 0; i--) {
  if (group.children[i].geometry) group.children[i].geometry.dispose();
  if (group.children[i].material) group.children[i].material.dispose();
  if (group.children[i].texture) group.children[i].texture.dispose();
  group.remove(group.children[i]);
}
}

export {
clearGroup,
createSpheres,
createSticks,
setupPdb,
checkNCO,
radiusfactor1,
radiusfactor2,
};
