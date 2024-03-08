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

const celestialBodies = [{
    id: 'sun',
    color: 'yellow',
    diameter: 1392700, // 1.3927 million kilometres
    distance: 0, // Starting point for this model
    name: 'Sun',
    facts: [
      'The Sun is a star at the center of the Solar System.',
      'It is composed of hot plasma interwoven with magnetic fields.',
    ]
  },
  {
    id: 'mercury',
    color: 'gray',
    diameter: 4879.4, // 4,879.4 kilometres
    distance: 0.4, // AU Distance
    name: 'Mercury',
    facts: [
      'Mercury is the smallest planet in the Solar System and the closest to the Sun.',
      'It has a very thin atmosphere composed mainly of oxygen, sodium, hydrogen, helium, and potassium.'
    ]
  },
  {
    id: 'venus',
    color: 'orange',
    diameter: 12104, // 12,104 kilometers
    distance: 0.72, // AU Distance
    name: 'Venus',
    facts: [
      'Venus is often called the "Morning Star" or the "Evening Star".',
      'It has a thick atmosphere mainly composed of carbon dioxide with clouds of sulfuric acid.'
    ]
  },
  {
    id: 'earth',
    color: 'blue',
    diameter: 12742, // 12,742 kilometres
    distance: 1, // AU Distance
    name: 'Earth',
    facts: [
      'Earth is the third planet from the Sun and the only astronomical object known to harbor life.',
      'It has one natural satellite, the Moon, which plays a significant role in stabilizing its axial tilt.'
    ]
  },
  {
    id: 'moon',
    color: 'gray',
    diameter: 3475, // 3,475 kilometers
    distance: 1.00257, // 1 AU + 384,400 kilometres (0.00257 AU)
    name: 'Moon',
    facts: [
      'The Moon is Earth\'s only natural satellite.',
      'It is tidally locked to Earth, meaning the same side always faces Earth.'
    ]
  },
  {
    id: 'mars',
    color: 'red',
    diameter: 6779, // 6,779 kilometers
    distance: 1.5, // AU Distance
    name: 'Mars',
    facts: [
      'Mars is known as the "Red Planet" due to its reddish appearance.',
      'It has the tallest volcano and the deepest canyon in the Solar System, Olympus Mons and Valles Marineris respectively.'
    ]
  },
  {
    id: 'jupiter',
    color: 'tan',
    diameter: 142800, // 142,800 kilometres
    distance: 5.20, // AU Distance
    name: 'Jupiter',
    facts: [
      'Jupiter is the largest planet in the Solar System and has more than 75 moons.',
      'Its iconic Great Red Spot is a massive storm that has been raging for at least 400 years.'
    ]
  },
  {
    id: 'saturn',
    color: 'gold',
    diameter: 120536, // 120,536 kilometres
    distance: 9.5, // AU Distance
    name: 'Saturn',
    facts: [
      'Saturn is known for its prominent ring system, made up of ice particles and dust.',
      'It has the second-largest moon in the Solar System, Titan, which has a dense atmosphere and surface lakes of liquid methane.'
    ]
  },
  {
    id: 'uranus',
    color: 'lightblue',
    diameter: 50724, // 50,724 kilometres
    distance: 19.8, // AU Distance
    name: 'Uranus',
    facts: [
      'Uranus is unique among the planets because it rotates on its side.',
      'It was the first planet discovered with a telescope, by William Herschel in 1781.'
    ]
  },
  {
    id: 'neptune',
    color: 'blue',
    diameter: 49528, // 49,528 kilometers
    distance: 30, // AU Distance
    name: 'Neptune',
    facts: [
      'Neptune is the farthest planet from the Sun and is often referred to as an "Ice Giant".',
      'It was the first planet to be discovered through mathematical calculations, rather than direct observation.'
    ]
  }
];


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

// Function to load 3D models
function loadModels() {
  const loader = new THREE.OBJLoader(); // Assuming you're using OBJ format

  celestialBodies.forEach(body => {
    loader.load(
      `assets/${body.id}.glb`, // Replace with actual path to model
      function(object) {
        // Adjust position and scale of the loaded model
        object.traverse(function(child) {
          if (child instanceof THREE.Mesh) {
            child.position.set(body.distance * scaleRatio, 0, 0); // Set position based on distance
            child.scale.set(body.diameter / scaleRatio, body.diameter / scaleRatio, body.diameter / scaleRatio); // Set scale based on diameter
          }
        });
        scene.add(object); // Add model to scene
      },
      function(xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      },
      function(error) {
        console.error('An error occurred', error);
      }
    );
  });
}

// Call loadModels function to load 3D models
loadModels();

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
