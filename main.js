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


window.mobileCheck = function() {
  let check = false;
  (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
  return check;
};
// window.mobileCheck()
if (window.innerHeight > window.innerWidth) { //if user is on mobile:
  fractalize("Right")
  fractalize("Right")
  fractalize("Right")
 } //...because i haven't implemented controls for changing depth on moblile yet...
