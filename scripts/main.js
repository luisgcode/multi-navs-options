"use strict";

document.addEventListener('DOMContentLoaded', function() {
  // Bottom navigation functionality - Switch between Options
  const bottomNavLinks = document.querySelectorAll('.bottom-nav-link');
  const optionContents = document.querySelectorAll('.option-content');

  bottomNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetOption = this.getAttribute('data-option');

      // Remove active class from all bottom nav links
      bottomNavLinks.forEach(l => l.classList.remove('active'));

      // Add active class to clicked link
      this.classList.add('active');

      // Hide all option contents
      optionContents.forEach(content => content.classList.remove('active'));

      // Show the corresponding option content
      document.getElementById(targetOption + '-content').classList.add('active');
    });
  });

  // Flame/Heat category buttons (only for Option 1)
  const categoryBtns = document.querySelectorAll('.category-btn');
  const secondaryNavs = document.querySelectorAll('.secondary-nav');
  const secondaryNavWrapper = document.querySelector('.secondary-nav-wrapper');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetCategory = this.getAttribute('data-category');

      // If clicking the same active button, deactivate it
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        secondaryNavWrapper.classList.remove('show');
        secondaryNavs.forEach(nav => nav.classList.remove('active'));
        return;
      }

      // Remove active class from all category buttons
      categoryBtns.forEach(b => b.classList.remove('active'));

      // Add active class to clicked button
      this.classList.add('active');

      // Show the secondary nav wrapper
      secondaryNavWrapper.classList.add('show');

      // Hide all secondary navs
      secondaryNavs.forEach(nav => nav.classList.remove('active'));

      // Show the corresponding secondary nav
      if (targetCategory === 'flame') {
        document.getElementById('flame-secondary').classList.add('active');
      } else if (targetCategory === 'heat') {
        document.getElementById('heat-secondary').classList.add('active');
      }
    });
  });

});
