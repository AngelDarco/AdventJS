import * as THREE from './three.js-master/build/three.module.js';
import { GLTFLoader } from './three.js-master/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from './three.js-master/examples/jsm/loaders/DRACOLoader.js';
import { OrbitControls } from './three.js-master/examples/jsm/controls/OrbitControls.js';

const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.DirectionalLight(0xffffff, 5);

//scene.background = new THREE.Color(0xffffff);
scene.background = new THREE.Color( 0x17202A );
scene.fog = new THREE.FogExp2( 0x17202A, 0.07 );


light.position.set(1,1,1);
scene.add(light);

camera.position.set(1, 3, 15);

dracoLoader.setDecoderPath('/assets/');
loader.setDRACOLoader(dracoLoader);

renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);



const geometry = new THREE.BoxGeometry(10,5,10);
const material = new THREE.MeshNormalMaterial({wireframe:true});
const cube = new THREE.Mesh(geometry, material);
cube.position.y = 2.5;
scene.add(cube);



let mixer;
loader.load(
    './assets/black_dragon/scene.gltf',
    function (gltf) {
        scene.add(gltf.scene);
        gltf.animations;
        gltf.scene;
        gltf.scenes;
        gltf.cameras;
        gltf.asset; 

       // console.log(gltf)

        mixer = new THREE.AnimationMixer(gltf.scene)
        const clips = gltf.animations;
        /*const clip = THREE.AnimationClip.findByName(clips, 'Sketchfab_Scene');
        const action = mixer.clipAction(clip);
        action.play(); */

        clips.forEach(function(clip){
            const action = mixer.clipAction(clip);
            action.play();
        });

    },undefined
    /* function (xhr) {
       // console.log((xhr.loaded / xhr.total * 100) + '%loaded');
    } */,
    function (err) {
        console.log('an error habe ocurred ', err);
    }
);

    //resize window
 window.addEventListener('resize', function(){
    const width = this.innerWidth;
    const height = this.innerHeight;
    renderer.setSize(width,height);
    camera.aspect = width/height;
    camera.updateProjectionMatrix;
}) 

//Mouse movements
const controls = new OrbitControls(camera, renderer.domElement);
controls.update();


// Dom Events
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointer(ev){
pointer.x = (ev.clientX / innerWidth) *2-1;
pointer.y = -(ev.clientY / innerHeight) *2+1;

raycaster.setFromCamera(pointer, camera);
const intersects = raycaster.intersectObjects(scene.children);
for(let i = 0; i < intersects.length; i++){
    console.log(intersects[i]),
    intersects[i].object.scale.z += 1;
}
}

const clock = new THREE.Clock(); 
function animate() {
    addEventListener('click', onPointer);
    if(mixer)
    mixer.update(clock.getDelta());
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();