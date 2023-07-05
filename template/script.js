// Get the div element
const div = document.querySelector('.footer-end');

// Create a new Intersection Observer instance
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add the 'animate__fadeInUp' class when the div is on screen
      div.classList.add('animate__fadeInUp');
    } else {
      // Remove the 'animate__fadeInUp' class when the div is not on screen
      div.classList.remove('animate__fadeInUp');
    }
  });
});

// Start observing the div
observer.observe(div);
