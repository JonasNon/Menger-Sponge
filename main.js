import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';




const color3 = new THREE.Color("rgb(255, 0, 0)");

let gray = 0x808080
let lime = 0x00ff00
let black = 0x000000
let white = 0xFFFFFF

let allCubes = []
let cubeStorage = []
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
clock.start()


const geometry = new THREE.BoxGeometry( 10, 10, 10 );
const material = new THREE.MeshBasicMaterial( { color: randomColor() } );
const starterCube = new THREE.Mesh( geometry, material );
scene.add( starterCube );
allCubes.push(starterCube)
cubeStorage.push(starterCube)

let manualTimer = 0
const timeBetweenColors = 0.5
function animate() {
  if (true) {
    manualTimer += clock.getDelta()
    if (manualTimer > timeBetweenColors) { //clock.elapsedTime also works
      manualTimer = 0
      console.log(allCubes.length)
      for (let k = 0; k < allCubes.length; k++) {
        let randomHex = '0x'+(Math.random() * 0xFFFFFF << 0).toString(16).padStart(6, '0')
        allCubes[k].material.color.setHex(randomHex)
      }
      camera.updateProjectionMatrix()
    }
    
  }
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );


function randomColor() {
  var o = Math.round, r = Math.random, s = 255;
  return 'rgb(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ')';
}



var left_arrow = 37; 
var right_arrow = 39; 

window.onkeydown= function(key){ 
  if(key.keyCode === left_arrow){ 
    fractalize("Left")
  }
  if(key.keyCode === right_arrow) { 
    fractalize("Right")
  }
};





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


let depthCounter = 0
let previousDepth = 0
const fractalize = (direction) => {
  previousDepth = depthCounter
  if (direction == "Left") {
    if (depthCounter != 0) {
      depthCounter -= 1

      for (let c = 0; c < allCubes.length; c++) {
        allCubes[c].geometry = undefined
        allCubes[c].material = undefined
        scene.remove(allCubes[c])
      }

      let newCubes = []
      cubeScale = cubeScale*3
      console.log(cubeStorage[depthCounter].length)
      if (cubeStorage[depthCounter].length == undefined) {
        newCubes.push(makeCube(cubeStorage[depthCounter].x, cubeStorage[depthCounter].y, cubeStorage[depthCounter].z, cubeStorage[depthCounter].position))
        newCubes[0].material.color.setHex(white)
      }
      for (let a = 0; a < cubeStorage[depthCounter].length; a++) {
        newCubes.push(makeCube(cubeStorage[depthCounter][a].x, cubeStorage[depthCounter][a].y, cubeStorage[depthCounter][a].z, cubeStorage[depthCounter][a].position))

  
      }
      
      allCubes = newCubes

    }
    console.log(depthCounter)

  } else if (direction == "Right") {
    depthCounter += 1
    console.log(depthCounter)
    
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

    if (cubeStorage[depthCounter] == undefined) {
      cubeStorage.push(allCubes)
    }
  
    
  } 


  
}

let tempDivider = 1
const makeCube = (x, y, z, startPos) => {
  const geometry = new THREE.BoxGeometry( cubeScale/tempDivider, cubeScale/tempDivider, cubeScale/tempDivider );
  const material = new THREE.MeshBasicMaterial( { color: randomColor() } );
  const newCube = new THREE.Mesh( geometry, material );

  if (previousDepth < depthCounter) {
    newCube.position.x = startPos.x + (x * cubeScale)
    newCube.position.y = startPos.y + (y * cubeScale)
    newCube.position.z = startPos.z + (z * cubeScale)
  } else {
    newCube.position.x = startPos.x
    newCube.position.y = startPos.y
    newCube.position.z = startPos.z
  }


  scene.add(newCube)
  return newCube
}

fractalize()
fractalize()
fractalize()

