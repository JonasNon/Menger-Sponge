import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';




const color3 = new THREE.Color("rgb(255, 0, 0)");

let gray = 0x808080
let lime = 0x00ff00
let black = 0x000000
let white = 0xFFFFFF

let allCubes = []
let cubeScale = 10

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.1, 10000)
camera.position.z = 12;

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);



const clock = new THREE.Clock(true)
const controls = new OrbitControls( camera, renderer.domElement );



const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial( { color: randomColor() } );
const starterCube = new THREE.Mesh( geometry, material );
scene.add( starterCube );
allCubes.push(starterCube)

function animate() {
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


function randomColor() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}




const relations = [ //relative positions of where new smaller cubes will be generated centered on single large cube
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

let tempDivider = 1
const makeCube = (x, y, z, startPos) => {
  const geometry = new THREE.BoxGeometry( cubeScale/tempDivider, cubeScale/tempDivider, cubeScale/tempDivider );
  const material = new THREE.MeshBasicMaterial( { color: randomColor() } );
  const newCube = new THREE.Mesh( geometry, material );

  newCube.position.x = startPos.x + (x * cubeScale)
  newCube.position.y = startPos.y + (y * cubeScale)
  newCube.position.z = startPos.z + (z * cubeScale)

  scene.add(newCube)
  return newCube
}

fractalize()
fractalize()
fractalize()

