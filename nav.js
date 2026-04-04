/**
 * Initialize navigation functionality
 */
function initializeNavigation() {
  setActiveNavLink();
  window.addEventListener('hashchange', setActiveNavLink);
}

/**
 * Set the active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    // Match the current page
    if (
      (currentPath.endsWith(href) && href !== '/') ||
      (href === '/' && (currentPath === '/' || currentPath.endsWith('index.html')))
    ) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeNavigation);
