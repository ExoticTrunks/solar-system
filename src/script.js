import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const sunTexture = textureLoader.load('/textures/sun.png')
const mercuryTexture = textureLoader.load('/textures/mercury.jpeg')
const venusTexture = textureLoader.load('/textures/venus.jpeg')
const earthTexture = textureLoader.load('/textures/earth.jpeg')
const marsTexture = textureLoader.load('/textures/mars.jpeg')
const jupiterTexture = textureLoader.load('/textures/jupiter.jpeg')
const saturnTexture = textureLoader.load('/textures/saturn.jpeg')
const saturnRingsTexture = textureLoader.load('/textures/saturnrings.jpeg')
const moonTexture = textureLoader.load('/textures/moon.jpeg')

// solar system grp
const solarSystemGroup = new THREE.Group;

/**
 * Sun
 */
const sunGeometry = new THREE.SphereGeometry( 10, 35, 16 );
const sunMaterial = new THREE.MeshBasicMaterial( { map: sunTexture, wireframe: false } );
const sun = new THREE.Mesh( sunGeometry, sunMaterial );
solarSystemGroup.add(sun)
scene.add(solarSystemGroup);

/**
 * Mercury
 */
 const mercuryOrbit = new THREE.Group;
 const mercuryGeometry = new THREE.SphereGeometry( 2, 35, 16 );
 const mercuryMaterial = new THREE.MeshBasicMaterial( { map: mercuryTexture, wireframe: false } );
 const mercury = new THREE.Mesh( mercuryGeometry, mercuryMaterial );
 mercury.position.x = 20
 mercuryOrbit.add(mercury)
 scene.add( mercuryOrbit );

 /**
 * Venus
 */
const venusOrbit = new THREE.Group;
const  venusGeometry = new THREE.SphereGeometry( 2.4, 35, 16 );
const venusMaterial = new THREE.MeshBasicMaterial( { map: venusTexture, wireframe: false } );
const venus = new THREE.Mesh( venusGeometry, venusMaterial );
venus.position.x = mercury.position.x + 13
venusOrbit.add(venus)
scene.add( venusOrbit)

 /**
 * Earth
 */
const earthOrbit = new THREE.Group;
const  earthGeometry = new THREE.SphereGeometry( 2.5, 35, 16 );
const earthMaterial = new THREE.MeshBasicMaterial( { map: earthTexture, wireframe: false } );
const earth = new THREE.Mesh( earthGeometry, earthMaterial );
earth.position.x = venus.position.x + 13
earthOrbit.add(earth)
scene.add( earthOrbit );

   /**
 * Moon
 */
const moonOrbit = new THREE.Group();
const  moonGeometry = new THREE.SphereGeometry( 0.7, 35, 16 );
const moonMaterial = new THREE.MeshBasicMaterial( { map: moonTexture, wireframe: false } );
const moon = new THREE.Mesh( moonGeometry, moonMaterial );
moonOrbit.add(moon)
moonOrbit.position.x = earth.position.x 
moon.position.x = 5
earthOrbit.add(moonOrbit)

 /**
 * Mars
 */
const marsOrbit = new THREE.Group();
const  marsGeometry = new THREE.SphereGeometry( 2.5, 35, 16 );
const marsMaterial = new THREE.MeshBasicMaterial( { map: marsTexture, wireframe: false } );
const mars = new THREE.Mesh( marsGeometry, marsMaterial );
mars.position.x = earth.position.x + 13
marsOrbit.add(mars)
scene.add( marsOrbit );

 /**
 * jupiter
 */
  const jupiterOrbit = new THREE.Group();
  const jupiterGeometry = new THREE.SphereGeometry( 8, 35, 16 );
  const jupiterMaterial = new THREE.MeshBasicMaterial( { map: jupiterTexture, wireframe: false } );
  const jupiter = new THREE.Mesh( jupiterGeometry, jupiterMaterial );
  jupiter.position.x = mars.position.x + 15
  jupiterOrbit.add(jupiter)
  scene.add( jupiterOrbit );

 /**
 * saturn
 */
  const saturnOrbit = new THREE.Group();
  const saturnGeometry = new THREE.SphereGeometry( 8, 35, 16 );
  const saturnMaterial = new THREE.MeshBasicMaterial( { map: saturnTexture, wireframe: false } );
  const saturn = new THREE.Mesh( saturnGeometry, saturnMaterial );
  const geometry = new THREE.RingBufferGeometry( 10, 15, 40 );
//   var pos = geometry.attributes.position;
//   var v3 = new THREE.Vector3();
//   for (let i = 0; i < pos.count; i++){
//     v3.fromBufferAttribute(pos, i);
//     geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
//   }
  const material = new THREE.MeshBasicMaterial( { color: '#D2B48C', side: THREE.DoubleSide, } );
  const mesh = new THREE.Mesh( geometry, material );
  mesh.position.x = jupiter.position.x + 20
  mesh.rotateY(7)
  mesh.rotateX(1)
  saturn.position.x = jupiter.position.x + 20
  saturnOrbit.add(saturn, mesh)
  scene.add( saturnOrbit );

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//full screen on double click
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
})


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 2000)
camera.position.z = 30
camera.position.x = -10
camera.position.y = 50

camera.lookAt(earth)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()


const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    mercury.rotation.y += 0.005
    venus.rotation.y += 0.005
    earth.rotation.y += 0.005
    mars.rotation.y += 0.005
    jupiter.rotation.y += 0.005
    saturn.rotation.y += 0.005
    moon.rotation.y += 0.005
    
    mercuryOrbit.rotation.y += 0.015
    venusOrbit.rotation.y += 0.008
    earthOrbit.rotation.y += 0.005;
    moonOrbit.rotation.y += 0.5;
    marsOrbit.rotation.y += 0.001;
    jupiterOrbit.rotation.y += 0.0005;
    saturnOrbit.rotation.y += 0.0003;
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()