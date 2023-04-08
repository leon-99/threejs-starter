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
import saturnRingUrl from './src/images/saturn-ring.png';
import uranusImgUrl from './src/images/uranus.jpeg';
import naptuneImgUrl from './src/images/naptune.jpeg';
import bgJpg from './src/images/space.jpg';
import moonImgUrl from './src/images/moon.jpg';
import moonBumpsImgUrl from './src/images/moon-bumps.jpg';

const textureLoader = new THREE.TextureLoader();



// importing orbit control
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// setting the renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

// open shadows for renender, default is false
renderer.shadowMap.enabled = true;

// setting scene
const scene = new THREE.Scene();

// adding scene background
const spaceTexture = new THREE.TextureLoader().load(bgJpg);
scene.background = spaceTexture;


// setting up the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 150, 600)

// Adding lighting

// point light is like a light bulb, it spreads the light in all directions.
const pointLight = new THREE.PointLight(0xffe87c);
pointLight.intensity = 2;


// setting point light as the shadow source
pointLight.castShadow = true;

// ambient light
const ambientLight = new THREE.AmbientLight(0xffe87c);

scene.add(pointLight);

// adding the sun
const sunTexture = new THREE.TextureLoader().load(sunImgUrl);
// const sunGravityObj = new THREE.Object3D();
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 20),
  new THREE.MeshBasicMaterial({
    map: sunTexture
  })
)
scene.add(sun);

// create planets
function createPlanet(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture)
  });

  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringMesh = new THREE.Mesh(
      new THREE.RingGeometry(ring.innerRadius, ring.outerRadius, 32),
      new THREE.MeshBasicMaterial({
        map: textureLoader.load(ring.texture),
        side: THREE.DoubleSide
      })
    );
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
    obj.add(ringMesh);
  }
  scene.add(obj);
  mesh.position.x = position
  return { mesh, obj };
}

const mercury = createPlanet(3, mercuryImgUrl, 80);
const venus = createPlanet(5, venusImgUrl, 110);
const earth = createPlanet(5, earthImgUrl, 140);
const mars = createPlanet(5, marsImgUrl, 170);
const jupiter = createPlanet(15, jupiterImgUrl, 210);
const saturn = createPlanet(14, saturnImgUrl, 300, {
  innerRadius: 18,
  outerRadius: 30,
  texture: saturnRingUrl
});
const uranus = createPlanet(10, uranusImgUrl, 340);
const naptune = createPlanet(10, naptuneImgUrl, 370);


//  Calling orbit control
const controls = new OrbitControls(camera, renderer.domElement);

// Making recursive function to animate the object
function animate() {
  requestAnimationFrame(animate);
  mercury.obj.rotation.y += 0.04;
  venus.obj.rotation.y += 0.03;
  earth.obj.rotation.y += 0.02;
  mars.obj.rotation.y += 0.01;
  jupiter.obj.rotation.y += 0.008;
  saturn.obj.rotation.y += 0.007;
  uranus.obj.rotation.y += 0.006;
  naptune.obj.rotation.y += 0.005;

  mercury.mesh.rotation.y += 0.005;
  venus.mesh.rotation.y += 0.005;
  earth.mesh.rotation.y += 0.005;
  mars.mesh.rotation.y += 0.005;
  jupiter.mesh.rotation.y += 0.005;
  saturn.mesh.rotation.y += 0.005;
  uranus.mesh.rotation.y += 0.005;
  naptune.mesh.rotation.y += 0.005;

  // earth.rotation.y += 0.002;
  // moon.rotation.y += 0.001;

  //to sync the scene with the current state of the orbit control.
  controls.update();

  renderer.render(scene, camera);
}
animate();


