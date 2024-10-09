import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(800, 800);
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(5, 5);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

plane.position.set(0, 0, 0);
camera.position.z = 25;

let velocityX = 0.27;
let velocityY = -0.3;
let numberOfBounce = 0;

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function animate() {
  requestAnimationFrame(animate);


  plane.position.x += velocityX;
  plane.position.y += velocityY;


  if (plane.position.x > 39 || plane.position.x < -39) {
    velocityX = -velocityX; 
    plane.material.color.set(getRandomColor());
    reducePlaneSize();
    incrementBounceCount();
  }
  
  if (plane.position.y > 19 || plane.position.y < -17) {
    velocityY = -velocityY; 
    plane.material.color.set(getRandomColor()); 
    reducePlaneSize();
    incrementBounceCount();
  }

  renderer.render(scene, camera);
}

function reducePlaneSize() {
  const newSize = Math.max(0.1, plane.geometry.parameters.width * 0.6);
  plane.geometry.dispose();
  plane.geometry = new THREE.PlaneGeometry(newSize, newSize);
}

function incrementBounceCount() {
  numberOfBounce++;
  if (numberOfBounce === 6) {
    scene.remove(plane);
  }
}

animate();
