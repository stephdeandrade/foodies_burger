import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

const canvas = document.querySelector('canvas.webgl')

// Cursor
const cursor = {
    x: 0,
    y: 0
}
window.addEventListener('mousemove', (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = (event.clientY / sizes.width - 0.5)
})
// Scene
const scene = new THREE.Scene()

// // Red cube
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000})
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

const plane = new THREE.PlaneGeometry(100,100);
const planemat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    side : THREE.DoubleSide,
});

const floor = new THREE.Mesh(plane, planemat);
scene.add(floor);
floor.position.z = -2
floor.receiveShadow = true;


// // Models

const loader = new GLTFLoader();


loader.load( 'models/burger.glb', function ( gltf ) {
    gltf.scene.scale.set(3,3,3)
    scene.add( gltf.scene );

}, undefined, function ( error ) {
    console.error( error );
    
} );





// Lights
 const ambientLight = new THREE.AmbientLight(0xffffff, 1)
 scene.add(ambientLight)

   const sunLight = new THREE.DirectionalLight("#ffffff", 2);
    sunLight.castShadow = true;
    sunLight.shadow.camera.far = 20;
    sunLight.shadow.mapSize.set(2048,2048);
    sunLight.shadow.normalBias = 0.05;
    sunLight.position.set(-1.5, 7, 3);
   scene.add(sunLight);


// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)


// Sizes

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>{
    //  Sizes update
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


})

window.addEventListener('dblclick', () => {
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
    if(!fullscreenElement){
        if(canvas.requestFullscreen){
            canvas.requestFullscreen()
        }else if(canvas.webkitRequestFullscreen){
            canvas.webkitRequestFullscreen()

        }
    }else{
        if(document.exitFullscreen){
            document.exitFullscreen()
        }else if(document.webkitExitFullscreen)
        document.webkitExitFullscreen()
    }
})


// Camera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera( (-aspectRatio * 5)/2,
(aspectRatio * 5)/2,
5/2,
-5/2,
-50,
50 );
scene.add( camera );



// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)

// Controls
//  const controls = new OrbitControls(camera, canvas)


// Renderer
 const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.CineonToneMapping;
renderer.toneMappingExposure = 1.75;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


// Animate
const clock = new THREE.Clock()

const tick = () => {
    const elapsedtime = clock.getElapsedTime()

    // controls.update()

    renderer.render(scene, camera)
    

    window.requestAnimationFrame(tick)
}

tick()