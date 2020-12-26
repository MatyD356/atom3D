import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer

scene = new THREE.Scene()

camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.0001, 10000)
camera.position.set(0, 0, 50)

renderer = new THREE.WebGL1Renderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const handleResize = () => {
  const { innerWidth, innerHeight } = window
  renderer.setSize(innerWidth, innerHeight)
  camera.aspect = innerWidth / innerHeight
  camera.updateProjectionMatrix()
}

const createSphere = (r = 1, color = 0x61DAFB) => {
  const sphereMat = new THREE.MeshPhysicalMaterial({
    color,
  })
  const sphereGeo = new THREE.SphereGeometry(r, 20, 20)
  return new THREE.Mesh(sphereGeo, sphereMat)
}

const createPointLight = (i = 1, color = 0xffffff) => {
  return new THREE.PointLight(color, i)
}

const nucleus = createSphere(3)
const l1 = createPointLight(.8)
const l2 = createPointLight(.4)
l1.position.set(60, 20, 60)
l2.position.set(-30, 0, 20)

scene.add(nucleus, l2)
nucleus.add(l1)

const createElectron = (r = .4, color = 0x61DAFB) => {
  const sphere = createSphere(r, color)
  const pivot = new THREE.Object3D()
  pivot.add(sphere)
  return {
    sphere,
    pivot
  }
}

const e1 = createElectron(.4)
const e2 = createElectron(.4)
const e3 = createElectron(.4)
const e4 = createElectron(.4)

e1.sphere.position.set(10, 0, 0)
e2.sphere.position.set(5, 0, 0)
e3.sphere.position.set(-5, 0, 0)
e4.sphere.position.set(-10, 0, 0)

/* const geometry = new THREE.TorusGeometry(10, .1, 4, 100);
const material = new THREE.MeshPhysicalMaterial({ color: 0x61DAFB });
const torus = new THREE.Mesh(geometry, material); */

nucleus.add(e1.pivot, e2.pivot, e3.pivot, e4.pivot)

e1.pivot.rotation.y = 120
e2.pivot.rotation.y = 60
e3.pivot.rotation.y = -60
e4.pivot.rotation.y = -90


const loop = () => {
  e1.pivot.rotation.z += 0.04
  e2.pivot.rotation.z += 0.05
  e3.pivot.rotation.z += 0.03
  e4.pivot.rotation.z += 0.06

  nucleus.rotation.z += 0.001
  nucleus.rotation.x += 0.002
  nucleus.rotation.y += 0.003

  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

loop()
window.addEventListener('resize', handleResize)
