import './style.css'
import * as THREE from 'three';
import moonJpg from './src/images/moon.jpg'
import earthJpg from './src/images/earth.jpg'
import sunJpeg from './src/images/sun.jpg'
import bgJpg from './src/images/space.jpg'
import earthBumpsPng from './src/images/earth-bumps.png';
import moonBumpsJpg from './src/images/moon-bumps.jpg';

// importing orbit control
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// setting scene
const scene = new THREE.Scene();

// setting camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.setZ(30);
camera.position.setY(20);


// setting renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// open shadows for renender, default is false
renderer.shadowMap.enabled  = true;

// Making Objects 

// get torus shape
const geometry = new THREE.TorusGeometry(10, 3, 16, 100);

// getting material
const material = new THREE.MeshStandardMaterial({ color: 0xff6347, wireframe: true });

// combining the shape and material using Mesh
const torus = new THREE.Mesh(geometry, material);


// adding the object to the scene
// scene.add(torus);

// Adding Moon
const moonTexture = new THREE.TextureLoader().load(moonJpg);
const moonBumps = new THREE.TextureLoader().load(moonBumpsJpg);

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(2, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: moonBumps
  })
)
// moon position
moon.position.set(10, 20, -20);
// setting moon as reciever of shadow
moon.receiveShadow = true;

// Adding earth
const earthTexture = new THREE.TextureLoader().load(earthJpg);
const earthBumps = new THREE.TextureLoader().load(earthBumpsPng);
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthBumps
  })
)
earth.position.y = 8;
// setting earth as an object that casts shadow
earth.castShadow = true;

// adding the sun
const sunTexture = new THREE.TextureLoader().load(sunJpeg);
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 32, 32),
  new THREE.MeshBasicMaterial({
    map: sunTexture
  })
)
sun.position.set(0, 0, 70);

// add to scene
scene.add(moon, earth, sun);


// Adding lighting

// point light is like a light bulb
const pointLight = new THREE.PointLight(0xffe87c);
pointLight.intensity = 2;
pointLight.position.set(0, 0, 70);


// setting point light as the shadow source
pointLight.castShadow = true;

// ambient light
// const ambientLight = new THREE.AmbientLight(0xffe87c);

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
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
  star.receiveShadow = true;
}

//Creating an array of 200 values and call the addStar for each
Array(200).fill().forEach(addStars);


// adding scene background
const spaceTexture = new THREE.TextureLoader().load(bgJpg);
scene.background = spaceTexture;

// cube texture loader to set 3D background
// const cubeTexture = new THREE.CubeTextureLoader.load([
//   bgJpg,
//   bgJpg,
//   bgJpg,
//   bgJpg,
//   bgJpg,
//   bgJpg
// ]);
// scene.background = cubeTexture;


