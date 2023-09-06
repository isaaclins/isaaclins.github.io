// This event listener waits for the DOM (Document Object Model) to be fully loaded before executing the enclosed function.
window.addEventListener('DOMContentLoaded', function () {

  // This line checks if the user's user agent (browser) matches any of the listed mobile device names using a regular expression test.
  var isMobile =
    /iPhone|iPad|iPod|Android|webOS|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );

  // This function is defined to remove an HTML element with a specified ID.
  function removeElement(elementId) {
    var element = document.getElementById(elementId);
    if (element) {
      element.parentNode.removeChild(element);
    }
  }

  // If the user is on a mobile device (as determined earlier), this code removes an HTML element with the ID 'clickable-cursor-svg'.
  if (isMobile) {
    removeElement('clickable-cursor-svg');
  }
});

// This is a function definition for a function named 'downloadResume'.
function downloadResume() {

  // Create a new HTML anchor (link) element.
  var link = document.createElement('a');

  // Set the 'href' attribute of the anchor to the URL of the resume PDF file.
  link.href = 'https://cdn.discordapp.com/attachments/1091090575484272720/1111530947981090866/resume.pdf';

  // Set the 'download' attribute of the anchor to 'resume.pdf', which will prompt the user to download the linked file with that name.
  link.download = 'resume.pdf';

  // Trigger a click event on the anchor element, which will initiate the download.
  link.click();
}

// UPDATE: Commented on every line for people like me that forgets 
