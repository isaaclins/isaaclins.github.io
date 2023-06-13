var cursorSvg = document.getElementById('clickable-cursor-svg');

document.addEventListener('mousemove', function (event) {
  var x = event.clientX;
  var y = event.clientY;

  cursorSvg.style.left = x + 'px';
  cursorSvg.style.top = y + 'px';

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;
  var svgWidth = cursorSvg.offsetWidth;
  var svgHeight = cursorSvg.offsetHeight;
  // Check if the SVG touches the window's border
  if (
    x <= 10 ||
    x + svgWidth >= windowWidth ||
    y <= 30 ||
    y + svgHeight >= windowHeight
  ) {
    cursorSvg.style.display = 'none'; // Hide the SVG element
  } else {
    cursorSvg.style.display = 'block'; // Show the SVG element
  }
});

window.addEventListener('DOMContentLoaded', function () {
  // Check if the user is accessing the website on a mobile device
  var isMobile =
    /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // Function to remove the element with id="clickable-cursor-svg"
  function removeElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  // Remove the element if the user is on a mobile device
  if (isMobile) {
    removeElement('clickable-cursor-svg');
  }
});

function downloadResume() {
  var link = document.createElement('a');
  link.href =
    'https://cdn.discordapp.com/attachments/1091090575484272720/1111530947981090866/resume.pdf';
  link.download = 'resume.pdf';
  link.click();
}



// Select the element you want to observe
const cardElement = document.querySelector('.CARDRIGHT');

// Create a new Intersection Observer
const observer = new IntersectionObserver(function(entries, observer) {
entries.forEach(entry => {
if (entry.isIntersecting) {
// Add the desired class when the element is in view
  entry.target.classList.add('animate__slideInRight');
  entry.target.classList.remove('invisible');
observer.unobserve(entry.target); // Stop observing once the class is added
}
});
}, { threshold: 0.5 });

// Start observing the element
observer.observe(cardElement);


const myCardElement = document.querySelector('.CARDLEFT');

// Create a new Intersection Observer
const myObserver = new IntersectionObserver(function(entries, observer) {
entries.forEach(entry => {
if (entry.isIntersecting) {
// Add the desired class when the element is in view
  entry.target.classList.add('animate__slideInLeft');
  entry.target.classList.remove('invisible'); 
observer.unobserve(entry.target); // Stop observing once the class is added
}
});
}, { threshold: 0.5 });

// Start observing the element
myObserver.observe(myCardElement);


