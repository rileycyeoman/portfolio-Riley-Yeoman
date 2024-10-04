function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

//Three JS Section
// Scene setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color('#121212');
// Add a simple ambient light
var light = new THREE.AmbientLight(0x404040, 6); // Soft white light
scene.add(light);

// Load the 3D model
var loader = new THREE.GLTFLoader();
loader.load('./models/robot_arm/scene.gltf', function(gltf) {
    var model = gltf.scene;
    scene.add(model);
    model.position.set(7, -1, -1);
    model.scale.set(1.2,1.2,1.2);
    model.traverse(function (child) {
        if (child.isMesh) {
            console.log(child.name); 
    }});
    // base = model.getObjectByName('Object_18');
});


camera.position.set(0,1,5);

// Render loop
var animate = function() {
    requestAnimationFrame(animate);

    // base.rotation.y += 0.01;
    renderer.render(scene, camera);
};

animate();

// Resize canvas when window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});