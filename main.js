import './style.css';
import * as THREE from 'three';
import earthImgUrl from './src/images/earth.jpg';
import earthBumpsImgUrl from './src/images/earth-bumps.png';
import sunImgUrl from './src/images/sun.jpg';
import mercuryImgUrl from './src/images/mercury.jpg';
import venusImgUrl from './src/images/venus.jpg';
import marsImgUrl from './src/images/mars.jpg';
import jupiterImgUrl from './src/images/jupiter.jpeg';
import saturnImgUrl from './src/images/saturn.jpg';
import uranusImgUrl from './src/images/uranus.jpeg';
import naptuneImgUrl from './src/images/naptune.jpeg';
import bgJpg from './src/images/space.jpg';
import moonImgUrl from './src/images/moon.jpg';
import moonBumpsImgUrl from './src/images/moon-bumps.jpg';

import data from './data-values';

// importing orbit control
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// setting the renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// open shadows for renender, default is false
renderer.shadowMap.enabled  = true;

// setting scene
const scene = new THREE.Scene();

// adding scene background
const spaceTexture = new THREE.TextureLoader().load(bgJpg);
scene.background = spaceTexture;


// setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(...data.values.PerspectiveCameraPosition)

// Adding lighting

// point light is like a light bulb, it spreads the light in all directions.
const pointLight = new THREE.PointLight(0xffe87c);
pointLight.intensity = 2;
pointLight.position.set(...data.values.sunPosition);


// setting point light as the shadow source
pointLight.castShadow = true;

// ambient light
const ambientLight = new THREE.AmbientLight(0xffe87c);

scene.add(pointLight);

// adding the sun
const sunTexture = new THREE.TextureLoader().load(sunImgUrl);
const sunGravityObj = new THREE.Object3D();
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 32),
  new THREE.MeshBasicMaterial({
    map: sunTexture
  })
)
scene.add(sun, sunGravityObj);



// Adding Marcury
const marcuryTexture = new THREE.TextureLoader().load(mercuryImgUrl);
const marcuryGravityObj = new THREE.Object3D();
const marcury = new THREE.Mesh(
  new THREE.SphereGeometry(3, 10, 10),
  new THREE.MeshStandardMaterial({
    map: marcuryTexture
  })
)
scene.add(marcuryGravityObj);
marcury.position.set(...data.values.marcuryPosition);
// setting earth as an object that casts shadow
marcury.castShadow = true;
marcuryGravityObj.add(marcury);

// Adding venus
const venusTexture = new THREE.TextureLoader().load(venusImgUrl);
const venusGravityObj = new THREE.Object3D();
const venus = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: venusTexture
  })
)
scene.add(venusGravityObj);
venus.position.set(...data.values.venusPosition);
// setting earth as an object that casts shadow
venus.castShadow = true;
venusGravityObj.add(venus);

// Adding earth
const earthTexture = new THREE.TextureLoader().load(earthImgUrl);
const earthBumps = new THREE.TextureLoader().load(earthBumpsImgUrl);
const earthGravityObj = new THREE.Object3D();
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthBumps
  })
)
scene.add(earthGravityObj);
earth.position.set(...data.values.earthPosition);
// setting earth as an object that casts shadow
earth.castShadow = true;
earthGravityObj.add(earth);

// Adding mars
const marsTexture = new THREE.TextureLoader().load(marsImgUrl);
const marsGravityObj = new THREE.Object3D();
const mars = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture
  })
)
scene.add(marsGravityObj);
mars.position.set(...data.values.marsPosition);
// setting earth as an object that casts shadow
mars.castShadow = true;
marsGravityObj.add(mars);

// Adding jupiter
const jupiterTexture = new THREE.TextureLoader().load(jupiterImgUrl);
const jupiterGravityObj = new THREE.Object3D();
const jupiter = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: jupiterTexture
  })
)
scene.add(jupiterGravityObj);
jupiter.position.set(...data.values.jupiterPosition);
// setting earth as an object that casts shadow
jupiter.castShadow = true;
jupiterGravityObj.add(jupiter);

// Adding Saturn
const saturnTexture = new THREE.TextureLoader().load(saturnImgUrl);
const saturnGravityObj = new THREE.Object3D();
const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(15, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
)
scene.add(saturnGravityObj);
saturn.position.set(...data.values.saturnPosition);
// setting earth as an object that casts shadow
saturn.castShadow = true;
saturnGravityObj.add(saturn);

// Adding Uranus
const uranusTexture = new THREE.TextureLoader().load(uranusImgUrl);
const uranusGravityObj = new THREE.Object3D();
const uranus = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: uranusTexture
  })
)
scene.add(uranusGravityObj);
uranus.position.set(...data.values.uranusPosition);
// setting earth as an object that casts shadow
uranus.castShadow = true;
uranusGravityObj.add(uranus);

// Adding Naptune
const naptuneTexture = new THREE.TextureLoader().load(naptuneImgUrl);
const naptuneGravityObj = new THREE.Object3D();
const naptune = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32),
  new THREE.MeshStandardMaterial({
    map: naptuneTexture
  })
)
scene.add(naptuneGravityObj);
naptune.position.set(...data.values.naptunePosition);
// setting earth as an object that casts shadow
naptune.castShadow = true;
naptuneGravityObj.add(naptune);

// Adding Moon
// const moonTexture = new THREE.TextureLoader().load(moonImgUrl);
// const moonBumps = new THREE.TextureLoader().load(moonBumpsImgUrl);
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry(2, 32, 32),
//   new THREE.MeshStandardMaterial({
//     map: moonTexture,
//     normalMap: moonBumps
//   })
// )
// // moon position
// moon.position.set(10, 10, -20);
// // setting moon as reciever of shadow
// moon.receiveShadow = true;
// earthGravityObj.add(moon);



// add to scene
// scene.add(earth, sun);



//  Calling orbit control
const controls = new OrbitControls(camera, renderer.domElement);

// Making recursive function to animate the object
function animate() {
  requestAnimationFrame(animate);
  marcuryGravityObj.rotation.y += 0.04;
  venusGravityObj.rotation.y += 0.03;
  marsGravityObj.rotation.y += 0.02;
  earthGravityObj.rotation.y += 0.01;
  jupiterGravityObj.rotation.y += 0.008;
  saturnGravityObj.rotation.y += 0.007;
  uranusGravityObj.rotation.y += 0.006;
  naptuneGravityObj.rotation.y += 0.005;

  // earth.rotation.y += 0.002;
  // moon.rotation.y += 0.001;

  //to sync the scene with the current state of the orbit control.
  controls.update();

  renderer.render(scene, camera);
}
animate();

// Adding stars
// function addStars() {
//   const geometry = new THREE.SphereGeometry(0.25, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);
//   const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
//   star.position.set(x, y, z);
//   scene.add(star);
//   star.receiveShadow = true;
// }

//Creating an array of 200 values and call the addStar for each
// Array(200).fill().forEach(addStars);

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


