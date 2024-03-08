function startExploring() {
  document.getElementById('root').style.display = 'none'; // Hide the landing page
  document.getElementById('landing-content').style.display = 'none'; // Hide the landing content
  document.body.classList.add('show-marker'); // Add class to show the marker line
  document.querySelector('.container').style.display = 'block'; // Show the celestial bodies
  document.querySelector('.astronaut').style.display = 'block'; // Show the astronaut
}
const astronomicalUnit = 149597871; // 149,597,871 kilometers (1 AU)
const scaleRatio = 300; // Each unit represents 300 times the corresponding distance in reality

let debounceTimer;

// Initialize Three.js scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('three-container').appendChild(renderer.domElement);

// Load 3D models
const loader = new THREE.OBJLoader();
loader.load(
  'assets/Sun_1_1391000.glb',
  function(object) {
    // Adjust position and scale of the loaded model
    object.position.set(x, y, z);
    object.scale.set(scaleX, scaleY, scaleZ);
    scene.add(object);
  },
  function(xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function(error) {
    console.error('An error occurred', error);
  }
);

// Set camera position
camera.position.z = 5;

// Render loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();


function generateAstronaut() {
  const astronaut = document.getElementById('astronaut');

  astronaut.addEventListener('click', function() {
    showRandomAstronautFact(); // Display random fact
  });
}

function showRandomAstronautFact() {
  const astronautFacts = [
    'Space is completely silent.',
    'The Sun contains 99.86% of the mass in the Solar System.',
    'The largest volcano in the Solar System is on Mars: Olympus Mons.',
    'A day on Venus is longer than a year on Venus.',
    'There are more stars in the universe than grains of sand on all the beaches on Earth.'
    // Add more facts as needed
  ];

  const randomAstronautFact = astronautFacts[Math.floor(Math.random() * astronautFacts.length)];
  const astronautFactContainer = document.querySelector('.astronaut-fact');
  const astronautFact = astronautFactContainer.querySelector('.fact');
  astronautFact.textContent = randomAstronautFact;
  astronautFactContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
  generateAstronaut(); // Generate astronaut
});



// Function to set the glow effect for each celestial body
function setGlowColor(element, color) {
  element.style.boxShadow = `0 0 20px 10px ${color}`;
}

const factContainer = document.querySelector('.fact-container');
const factWrapper = factContainer.querySelector('.fact-wrapper');
factWrapper.style.backgroundColor = 'rgba(120, 120, 120, 0.7)'; // Set the background color dynamically
const nameElement = factContainer.querySelector('.name');
const diameterElement = factContainer.querySelector('.diameter');
const distanceElement = factContainer.querySelector('.distance');
const leftArrow = document.querySelector('.left-arrow');
const rightArrow = document.querySelector('.right-arrow');
const closeButton = document.querySelector('.close-button');

closeButton.addEventListener('click', function() {
  factContainer.style.display = 'none';
});

// JavaScript to close the fact box when the cross icon is clicked
const closeIcon = document.querySelector('.close-icon');
const astronautFactContainer = document.querySelector('.astronaut-fact');

closeIcon.addEventListener('click', function() {
  astronautFactContainer.style.display = 'none';
});


let currentBodyIndex = 0;
let currentFactIndex = 0;

function showFact(index) {
  const body = celestialBodies[currentBodyIndex];
  const facts = body.facts;
  nameElement.textContent = body.name;
  diameterElement.textContent = `Diameter: ${parseNumeriqueSpace(body.diameter)} km`;
  // Check if the current body is the Sun, then hide the distance
  if (body.id !== 'sun') {
    distanceElement.textContent = `Distance from Sun: ${parseNumeriqueSpace(Math.ceil(body.distance * astronomicalUnit))} km`;
  } else {
    distanceElement.textContent = ''; // Hide the distance for the Sun
  }
  factWrapper.textContent = facts[index];
  currentFactIndex = index;
}

leftArrow.addEventListener('click', function() {
  currentFactIndex = (currentFactIndex - 1 + celestialBodies[currentBodyIndex].facts.length) % celestialBodies[currentBodyIndex].facts.length;
  showFact(currentFactIndex); // Show the updated fact
  event.stopPropagation();
});

rightArrow.addEventListener('click', function() {
  currentFactIndex = (currentFactIndex + 1) % celestialBodies[currentBodyIndex].facts.length;
  showFact(currentFactIndex); // Show the updated fact
  event.stopPropagation();
});

celestialBodies.forEach(body => {
  const element = document.createElement('div');
  element.id = body.id;
  element.className = 'celestial-body';
  element.dataset.name = body.name; // Add dataset for name
  element.style.backgroundColor = body.color;

  // Set glow color to match the body's color
  setGlowColor(element, body.color);

  // Calculate size based on actual diameter and scale ratio
  const size = body.diameter / scaleRatio;

  // Calculate distance based on scale ratio
  const distance = (body.distance * astronomicalUnit) / scaleRatio;

  element.style.width = size + 'px';
  element.style.height = size + 'px';
  element.style.top = distance + 'px';
  element.style.left = 'calc(50% - ' + (size / 2) + 'px)'; // Adjust the left position to center the body
  document.querySelector('.container').appendChild(element);

  const nameElement = document.createElement('p');
  nameElement.className = 'name';
  nameElement.textContent = body.name;
  element.appendChild(nameElement);

  element.addEventListener('click', function() {
    currentBodyIndex = celestialBodies.findIndex(item => item.id === body.id); // Set current body index
    showFact(0); // Show the first fact when clicked
    factContainer.style.display = 'block'; // Show the fact container
  });

});

function parseNumeriqueSpace(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const markerLine = document.querySelector('.marker-line');
const sunPosition = celestialBodies[0].distance * astronomicalUnit / scaleRatio;
const sunDistanceKm = celestialBodies[0].distance * astronomicalUnit;

const lastBody = celestialBodies[celestialBodies.length - 1];
const lastBodyDistance = (lastBody.distance * astronomicalUnit) / scaleRatio;
const lastBodyDiameter = lastBody.diameter / scaleRatio;
const bufferHeight = lastBodyDistance + lastBodyDiameter + 1000; // Adjust the buffer height as needed

// Set the container height to include the buffer
document.querySelector('.container').style.height = bufferHeight + 'px';

factContainer.addEventListener('click', function(event) {
  // Prevent click events from propagating outside the container
  event.stopPropagation();
});

document.addEventListener('click', function(event) {
  if (!event.target.closest('.celestial-body') && event.target !== factContainer) {
    factContainer.style.display = 'none';
  }
});

window.addEventListener('scroll', function() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(function() {
    const scrollPosition = window.scrollY;
    const markerOffset = markerLine.getBoundingClientRect().top + window.scrollY - sunPosition;
    let distanceFromSunKm = (markerOffset > 0 ? markerOffset : 0) * scaleRatio + sunDistanceKm;

    if (markerOffset > celestialBodies[0].diameter / scaleRatio) {
      document.getElementById('distance').textContent = distanceFromSunKm.toLocaleString();
      document.querySelector('.distance-meter').style.display = 'block';
    } else {
      document.querySelector('.distance-meter').style.display = 'none';
    }
  }, 50); // Adjust the debounce delay as needed
});
