function toggleMenu(){
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

//Three JS Section
// Scene setup
const w = window.innerWidth
const h = window.innerHeight

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
scene.background = new THREE.Color('#121212');
// Add a simple ambient light
var light = new THREE.AmbientLight(0x404040, 6); // Soft white light
scene.add(light);

// Load the 3D model
var loader = new THREE.GLTFLoader();


function shuffleArray(arr) {
    let curIndex = arr.length;
    let randomIndex, temp;
    while (curIndex !== 0) {
      randomIndex = Math.floor(Math.random() * curIndex);
      curIndex -= 1;
      temp = arr[curIndex];
      arr[curIndex] = arr[randomIndex];
      arr[randomIndex] = temp;
    }
    return arr;
}
function getPoints() {
    const arr = [];
    const numCols = 15;
    const numRows = 15;
    const startPos = {
      x: 0,
      y: 2,
      z: -8.5,
    };
    const spacing = 1.5;
    let x, y, z;
    for (let i = 0; i < numCols; i += 1) {
      for (let j = 0; j < numRows; j += 1) {
        x = startPos.x + i * spacing;
        y = THREE.MathUtils.randFloatSpread(spacing * 8);
        z = startPos.z + j * spacing;
        arr.push({ x, y, z });
      }
    }
    return shuffleArray(arr);
}
function createThingFrom(points) {
    const geo = new THREE.BufferGeometry();
    const vertexPositions = [];
    const vertexColors = [];
    const cMult = 0.5;
    points.forEach((p) => {
        const { x, y, z } = p;
        vertexPositions.push(x, y, z);
    
        // Calculate gradient values for a cyan color (R: 0, G: varies, B: varies)
        const green = Math.abs(y) * 0.1; // Adjust the multiplier to control intensity
        const blue = Math.abs(z) * 0.4;  // Adjust the multiplier to control intensity
        const red = 0; // Cyan has no red component
    
        vertexColors.push(red, green, blue);
    });

    geo.setAttribute( "position", new THREE.Float32BufferAttribute(vertexPositions, 3));
    geo.setAttribute("color", new THREE.Float32BufferAttribute(vertexColors, 3));
    const mat = new THREE.MeshBasicMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.5,
    });
    const mesh = new THREE.Mesh(geo, mat);
    function update () {
        // mesh.rotation.y += 0.001;
        mesh.rotation.x += 0.001;
        // mesh.rotation.z += 0.001;
    }
    return { mesh, update };
}

const points = getPoints();
const thing = createThingFrom(points);
scene.add(thing.mesh);
thing.mesh.position.set(4,2,-2);
thing.mesh.scale.set(0.2,0.2,0.2);


const texts = [
    "Now with more Javascript!",
    "A Wolf in Developer's Clothing!",
    "Based in Minnesota!",
    "Robots? They make those now?!",
    "90% Bug Free!",
    "I'm Always A Call (or 2) Away!",
    "Now in 2D!",
    "No, It's A Hootenanny!",
    "Who You Calling A Pinhead?",
  ];
  
  // Select a random text
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  
  // Set the random text to the rotated text element
  document.querySelector(".rotated-text").textContent = randomText;
// Plane geometry (acts as a floor or background)
var planeGeometry = new THREE.PlaneGeometry(10, 10);
var planeMaterial = new THREE.ShaderMaterial({
    uniforms: {
        color1: { value: new THREE.Color(0x444444) }, // Dark gray at the bottom
        color2: { value: new THREE.Color(0x222222) }  // Darker gray at the top
    },
    vertexShader: `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform vec3 color1;
        uniform vec3 color2;
        varying vec2 vUv;
        void main() {
            // Create a vertical gradient by mixing two colors based on the y-coordinate of the UV
            gl_FragColor = vec4(mix(color1, color2, vUv.y), 1.0);
        }
    `,
    side: THREE.DoubleSide // Render both sides of the plane
});

var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2; // Lay it flat as the "floor"
plane.position.set(0, -1.5, 0); // Lower it slightly below the objects
scene.add(plane);

var time = 0;
camera.position.set(0, 1, 5);

// Target position for inverse kinematic
// Update rotation in the render loop
var animate = function() {
    requestAnimationFrame(animate);


    thing.update();

    time += 0.02; // Slow down time increment for less rapid movement

    renderer.render(scene, camera);
};

animate();


// Resize canvas when window is resized
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
