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




// Solid material
var geometry = new THREE.IcosahedronGeometry(1); // Radius of 1
var solidMaterial = new THREE.MeshPhongMaterial({ color: 0x00FFFF, flatShading: true }); // Solid green material
var icosahedronSolid = new THREE.Mesh(geometry, solidMaterial);
scene.add(icosahedronSolid);



// Wireframe material
var wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true }); // Wireframe (white)
var icosahedronWireframe = new THREE.Mesh(geometry, wireframeMaterial);
scene.add(icosahedronWireframe);


icosahedronSolid.position.set(-6, -1, 0);
icosahedronWireframe.position.set(-6, -1, 0);


var torusGeometry = new THREE.TorusGeometry(1, 0.3, 16, 100); // Large torus
var torusMaterial = new THREE.MeshPhongMaterial({ color: 0xff6347 }); // Red torus
var torus = new THREE.Mesh(torusGeometry, torusMaterial);
scene.add(torus);
torus.position.set(-6, 1, 0); // Position it to the left of the icosahedron


var time = 0;
camera.position.set(0,1,5);

// Render loop
var animate = function() {
    requestAnimationFrame(animate);

    // Rotate both the solid and wireframe icosahedron
    icosahedronSolid.rotation.x += 0.001;
    icosahedronSolid.rotation.y += 0.001;

    icosahedronWireframe.rotation.x += 0.001;
    icosahedronWireframe.rotation.y += 0.001;

    time += 0.05;
    torus.position.x = Math.sin(time) * 2;  // Move along x-axis
    torus.position.y = Math.sin(time * 0.5) * 1;  // Wave up and down
    torus.rotation.z += 0.05;  // Rotate the torus around its z-axis


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