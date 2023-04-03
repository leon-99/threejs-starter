import './style.css'
import * as THREE from 'three';
import moonJpg from './src/images/moon.jpg'
import earthJpg from './src/images/earth.jpg'
import bgJpg from './src/images/space.jpg'

// importing orbit control
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

// setting scene
const scene = new THREE.Scene();

// settinf camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);
camera.position.setY(20);

// setting renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// Making Objects 

// get torus shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// getting material
const material = new THREE.MeshStandardMaterial({color: 0xff6347});

// combining the shape and material using Mesh
const torus = new THREE.Mesh(geometry, material);


// adding the object to the scene
// scene.add(torus);

// Adding Moon
const moonTexture = new THREE.TextureLoader().load(moonJpg);
const earthTexture = new THREE.TextureLoader().load(earthJpg);
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2.5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture
  })
)

// moon position
moon.position.y = 20;
moon.position.x = 10;

// Adding earth
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
)
// add to scene
scene.add(moon, earth);

// Adding lighting

// point light is like a light bulb
const pointLight = new THREE.PointLight(0xffe87c);
pointLight.position.set(20, 20, 20);

// ambient light
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

// Light Helper
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

// Grid Helper
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper);


//  Calling orbit control
const controls = new OrbitControls(camera, renderer.domElement);

// Making recursive function to animate the object
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  earth.rotation.y += 0.005;  
  moon.rotation.y += 0.001;

  //to sync the scene with the current state of the orbit control.
  controls.update();

  renderer.render(scene, camera);
}
animate();

// Adding stars
function addStars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff});
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

//Creating an array of 200 values and call the addStar for each
Array(200).fill().forEach(addStars);

const spaceTexture = new THREE.TextureLoader().load(bgJpg);
scene.background = spaceTexture;


