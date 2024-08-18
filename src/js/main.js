// JavaScript for loading header and navbar dynamically

// Function to load component
function loadComponent(url, elementId) {
    fetch(url)
      .then(response => response.text())
      .then(data => {
        document.getElementById(elementId).innerHTML = data;
      });
  }
  
  // Load components
  loadComponent('../../src/components/header/header.html', 'app-header');
  loadComponent('../../src/components/navbar/navbar.html', 'bottom-navbar');
  
  