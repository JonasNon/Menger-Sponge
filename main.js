import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';



let gray = 0x808080
let lime = 0x00ff00
let black = 0x000000
let white = 0xFFFFFF

let allCubes = []
let cubeScale = 10

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, 2, 0.1, 10000)
camera.position.z = 8;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const clock = new THREE.Clock(true)
const controls = new OrbitControls( camera, renderer.domElement );
// controls.autoRotate = true


// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap

// //Create a DirectionalLight and turn on shadows for the light
// const light = new THREE.DirectionalLight( 0xffffff, 1 );
// light.position.set( 0, 100, 0 ); //default; light shining from top
// light.castShadow = true; // default false
// scene.add( light );
// light.shadow.mapSize.width = 512; // default
// light.shadow.mapSize.height = 512; // default
// light.shadow.camera.near = 0.5; // default
// light.shadow.camera.far = 500; // default



const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: lime } );
const starterCube = new THREE.Mesh( geometry, material );
scene.add( starterCube );
allCubes.push(starterCube)

function animate() {
  // starterCube.rotateY(.02)
  // controls.update(clock.getDelta);
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );








const relations = [
  {x:1, y:1, z:0},
  {x:1, y:-1, z:0},
  {x:-1, y:1, z:0},
  {x:-1, y:-1, z:0},
  {x:0, y:1, z:1},
  {x:0, y:-1, z:1},
  {x:0, y:1, z:-1},
  {x:0, y:-1, z:-1},
  {x:1, y:0, z:1},
  {x:1, y:0, z:-1},
  {x:-1, y:0, z:1},
  {x:-1, y:0, z:-1},
  {x:1, y:1, z:1},
  {x:1, y:1, z:-1},
  {x:1, y:-1, z:-1},
  {x:-1, y:-1, z:-1},
  {x:-1, y:-1, z:1},
  {x:-1, y:1, z:1},
  {x:-1, y:1, z:-1},
  {x:1, y:-1, z:1}
]



const fractalize = () => {
  let newCubes = []
  cubeScale = cubeScale/3
  for (let a = 0; a < allCubes.length; a++) {
    for (let i = 0; i < relations.length; i++) {
      newCubes.push(makeCube(relations[i].x, relations[i].y, relations[i].z, allCubes[a].position))
    }
    allCubes[a].geometry = undefined
    allCubes[a].material = undefined
    scene.remove(allCubes[a])
  }
  allCubes = newCubes

}

let tempDivider = 1.5
const makeCube = (x, y, z, startPos) => {
  const geometry = new THREE.BoxGeometry( cubeScale/tempDivider, cubeScale/tempDivider, cubeScale/tempDivider );
  const material = new THREE.MeshBasicMaterial( { color: white } );
  const newCube = new THREE.Mesh( geometry, material );
  newCube.position.x = startPos.x + (x * cubeScale)
  newCube.position.y = startPos.y + (y * cubeScale)
  newCube.position.z = startPos.z + (z * cubeScale)

  // newCube.castShadow = true; //default is false
  // newCube.receiveShadow = true; //default

  // const edges = new THREE.EdgesGeometry( geometry ); 
  // const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: black } ) ); 
  // scene.add( line );
  scene.add(newCube)
  return newCube
}

fractalize()
fractalize()
fractalize()
