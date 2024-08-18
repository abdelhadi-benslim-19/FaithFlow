// JavaScript for loading header, navbar, and tabs dynamically

// Function to load component
function loadComponent(url, elementId) {
  fetch(url)
    .then(response => response.text())
    .then(data => {
      document.getElementById(elementId).innerHTML = data;
      // Initialize Bootstrap components after loading content
      if (elementId === 'tabs-container') {
        const tabTriggerList = document.querySelectorAll('#myTab a[data-bs-toggle="tab"]');
        tabTriggerList.forEach(tabTriggerEl => {
          new bootstrap.Tab(tabTriggerEl);
        });
      }
    })
    .catch(error => console.error('Error loading component:', error));
}

// Load components
document.addEventListener('DOMContentLoaded', () => {
  loadComponent('../../src/components/header/header.html', 'app-header');
  loadComponent('../../src/components/navbar/navbar.html', 'bottom-navbar');
  loadComponent('../../src/components/tabs/prayer-tabs.html', 'tabs-container'); // Added for tabs
});
