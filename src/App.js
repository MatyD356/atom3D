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
  const sphereGeo = new THREE.SphereGeometry(r, 10, 10)
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

scene.add(nucleus, l1, l2)

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
e2.sphere.position.set(10, 0, 0)
e3.sphere.position.set(10, 0, 0)
e4.sphere.position.set(10, 0, 0)

const geometry = new THREE.TorusGeometry(10, .1, 4, 100);
const material = new THREE.MeshPhysicalMaterial({ color: 0x61DAFB });
const torus1 = new THREE.Mesh(geometry, material);
const torus2 = new THREE.Mesh(geometry, material);
const torus3 = new THREE.Mesh(geometry, material);


nucleus.add(torus1, torus2, torus3, e1.pivot, e2.pivot, e3.pivot)



const loop = () => {
  torus1.rotation.x += 0.01
  torus1.rotation.y += 0.01
  torus2.rotation.x += 0.01

  nucleus.rotation.z += 0.001
  nucleus.rotation.x += 0.002
  nucleus.rotation.y += 0.003

  e1.pivot.rotation.z += 0.1

  e2.pivot.rotation.x += 0.01
  e2.pivot.rotation.y += 0.01
  e2.pivot.rotation.z += 0.1

  e3.pivot.rotation.x += 0.01
  e3.pivot.rotation.z += 0.09

  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

loop()
window.addEventListener('resize', handleResize)
