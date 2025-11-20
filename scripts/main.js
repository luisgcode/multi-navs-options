"use strict";

document.addEventListener('DOMContentLoaded', function() {
  // Flame/Heat category buttons
  const categoryBtns = document.querySelectorAll('.category-btn');
  const secondaryNavs = document.querySelectorAll('.secondary-nav');
  const secondaryNavWrapper = document.querySelector('.secondary-nav-wrapper');

  // Track locked state
  let isLocked = false;
  let lockedCategory = null;

  // Function to set active category
  function setActiveCategory(category, lock = false) {
    // If locked and not forcing a lock (click), don't change
    if (isLocked && !lock) {
      return;
    }

    // If this is a click (lock = true), update locked state
    if (lock) {
      isLocked = true;
      lockedCategory = category;
      // Save to localStorage
      localStorage.setItem('dimplexCategory', category);
    }

    // Remove active class from all category buttons
    categoryBtns.forEach(b => b.classList.remove('active'));

    // Add active class to the selected button
    const activeBtn = document.querySelector(`[data-category="${category}"]`);
    if (activeBtn) {
      activeBtn.classList.add('active');
    }

    // Show the secondary nav wrapper
    if (secondaryNavWrapper) {
      secondaryNavWrapper.classList.add('show');
    }

    // Hide all secondary navs
    secondaryNavs.forEach(nav => nav.classList.remove('active'));

    // Show the corresponding secondary nav
    if (category === 'flame') {
      const flameNav = document.getElementById('flame-secondary');
      if (flameNav) {
        flameNav.classList.add('active');
      }
    } else if (category === 'heat') {
      const heatNav = document.getElementById('heat-secondary');
      if (heatNav) {
        heatNav.classList.add('active');
      }
    }

    // Add data attribute to body for CSS targeting
    document.body.setAttribute('data-category', category);
  }

  // Check localStorage on page load and restore context
  // First check if body has data-category attribute (from product pages)
  const bodyCategory = document.body.getAttribute('data-category');
  const savedCategory = localStorage.getItem('dimplexCategory');

  // Only run setActiveCategory if we have category buttons
  if (categoryBtns.length > 0) {
    if (bodyCategory) {
      // If page has explicit category, use that and lock it
      setActiveCategory(bodyCategory, true);
    } else if (savedCategory) {
      // For homepage, restore saved category from localStorage and lock it
      setActiveCategory(savedCategory, true);
    } else {
      // Default to flame if no saved category and lock it
      setActiveCategory('flame', true);
    }
  }

  categoryBtns.forEach(btn => {
    // Hover event to preview navigation (only if not locked)
    btn.addEventListener('mouseenter', function() {
      const targetCategory = this.getAttribute('data-category');
      setActiveCategory(targetCategory, false);
    });

    // Click event to lock the selection
    btn.addEventListener('click', function() {
      const targetCategory = this.getAttribute('data-category');
      setActiveCategory(targetCategory, true);
    });
  });

  // OPTION 2: Click to Lock functionality
  const opt2Btns = document.querySelectorAll('.opt2-category-btn');
  const opt2Navs = document.querySelectorAll('.opt2-secondary-nav');

  opt2Btns.forEach(btn => {
    btn.addEventListener('click', function() {
      const cat = this.getAttribute('data-cat');

      // Toggle buttons
      opt2Btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Toggle navs
      opt2Navs.forEach(nav => nav.classList.remove('active'));
      document.getElementById(`opt2-${cat}-nav`).classList.add('active');

      // Save to localStorage
      localStorage.setItem('dimplexCategory', cat);
    });
  });

  // OPTION 3: Sidebar functionality
  const opt3Btns = document.querySelectorAll('.opt3-cat-btn');
  const opt3Menus = document.querySelectorAll('.opt3-side-menu');

  opt3Btns.forEach(btn => {
    btn.addEventListener('click', function() {
      const cat = this.getAttribute('data-cat');

      // Toggle buttons
      opt3Btns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      // Toggle menus
      opt3Menus.forEach(menu => menu.classList.remove('active'));
      document.getElementById(`opt3-${cat}-menu`).classList.add('active');

      // Save to localStorage
      localStorage.setItem('dimplexCategory', cat);
    });
  });

});
