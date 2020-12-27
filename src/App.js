import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { gsap, TweenMax } from 'gsap';
import { Font } from 'three';

let scene, camera, renderer

scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.0001, 10000)
camera.position.set(0, 0, 20)

renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const handleResize = () => {
  const { innerWidth, innerHeight } = window
  renderer.setSize(innerWidth, innerHeight)
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
}

for (let j = -10; j < 10; j = j + 3) {
  for (let i = 0; i < 35; i = i + 2.5) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshPhongMaterial({ color: 0xFFD700 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(i - 15, j, 0)
    const tl = gsap.timeline({
      repeat: -1,
      yoyo: true
    })
    tl.to(cube.rotation, { duration: 10, x: 0.01 + i, ease: "slow.inOut" })
    scene.add(cube);
  }
}

const light1 = new THREE.PointLight(0xffffff, 1, 10000)
light1.position.set(0, 5, 5)
const light2 = new THREE.PointLight(0xffffff, 1, 10000)
light2.position.set(0, -10, 0)
scene.add(light1, light2)


const loop = () => {
  requestAnimationFrame(loop)
  renderer.render(scene, camera)
}

loop()
window.addEventListener('resize', handleResize)
