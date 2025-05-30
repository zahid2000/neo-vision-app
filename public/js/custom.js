// Execute when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  "use strict";
  
  // Initialize WOW.js (assuming this is a separate library)
  if (typeof WOW === 'function') {
    new WOW().init();
  }

  // Show modal
  const campPopup = document.getElementById('campPopup');
  if (campPopup && typeof campPopup.modal === 'function') {
    campPopup.modal('show');
  }

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function(event) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Scrollspy functionality
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    // Custom scrollspy implementation would go here
    // This would require a more complex implementation in vanilla JS
    // Consider using a small scrollspy library or custom implementation
  }

  // Toggle functionality
  const toggleTitles = document.querySelectorAll('.toggle .toggle-title');
  toggleTitles.forEach(title => {
    if (title.classList.contains('active')) {
      const toggleInner = title.closest('.toggle').querySelector('.toggle-inner');
      if (toggleInner) toggleInner.style.display = 'block';
    }
    
    title.addEventListener('click', function() {
      const toggleInner = this.closest('.toggle').querySelector('.toggle-inner');
      if (this.classList.contains('active')) {
        this.classList.remove('active');
        if (toggleInner) {
          // Slide up animation
          const height = toggleInner.scrollHeight;
          const transition = toggleInner.style.transition;
          toggleInner.style.transition = '';
          
          requestAnimationFrame(function() {
            toggleInner.style.height = height + 'px';
            toggleInner.style.transition = transition;
            
            requestAnimationFrame(function() {
              toggleInner.style.height = 0;
              setTimeout(() => {
                toggleInner.style.display = 'none';
              }, 200);
            });
          });
        }
      } else {
        this.classList.add('active');
        if (toggleInner) {
          // Slide down animation
          toggleInner.style.display = 'block';
          const height = toggleInner.scrollHeight;
          toggleInner.style.height = 0;
          
          requestAnimationFrame(function() {
            toggleInner.style.transition = 'height 200ms';
            toggleInner.style.height = height + 'px';
            setTimeout(() => {
              toggleInner.style.height = '';
            }, 200);
          });
        }
      }
    });
  });

  // Global variables to track dropdown event states
  let isMobile = window.innerWidth < 992;
  let hoverEnabled = false; // Start as false to ensure enableHoverMode runs on desktop
  let clickEnabled = isMobile;
  
  // Function to add hover event listeners for desktop
  function enableHoverMode() {
    if (!hoverEnabled) {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        // Create stored functions for event listeners so we can remove them later
        dropdown._mouseEnterHandler = function() {
          const menu = this.querySelector('.dropdown-menu');
          if (menu) {
            menu.style.display = 'block';
            // Fade in animation
            menu.style.opacity = 0;
            setTimeout(() => {
              menu.style.transition = 'opacity 200ms';
              menu.style.opacity = 1;
            }, 10);
          }
        };
        
        dropdown._mouseLeaveHandler = function() {
          const menu = this.querySelector('.dropdown-menu');
          if (menu) {
            // Fade out animation
            menu.style.transition = 'opacity 200ms';
            menu.style.opacity = 0;
            setTimeout(() => {
              menu.style.display = 'none';
            }, 200);
          }
        };
        
        // Add event listeners
        dropdown.addEventListener('mouseenter', dropdown._mouseEnterHandler);
        dropdown.addEventListener('mouseleave', dropdown._mouseLeaveHandler);
      });
      
      hoverEnabled = true;
    }
  }
  
  // Function to remove hover event listeners
  function disableHoverMode() {
    if (hoverEnabled) {
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        // Remove event listeners if they exist
        if (dropdown._mouseEnterHandler) {
          dropdown.removeEventListener('mouseenter', dropdown._mouseEnterHandler);
        }
        if (dropdown._mouseLeaveHandler) {
          dropdown.removeEventListener('mouseleave', dropdown._mouseLeaveHandler);
        }
      });
      
      hoverEnabled = false;
    }
  }
  
  // Initializing the appropriate mode based on screen size
  if (!isMobile) {
    // Force enable hover mode for desktop on initial load
    enableHoverMode();
  } else {
    // Ensure click mode is enabled for mobile on initial load
    clickEnabled = true;
  }

  // Bootstrap carousel (assuming Bootstrap JS is still included)
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel) {
      new bootstrap.Carousel(carousel);
    }
  });

  // Owl Carousel functionality 
  // These need to remain as is if you're using OwlCarousel
  // but using vanilla JS to initialize them
  const clientsList = document.getElementById('clients-list');
  if (clientsList && typeof owlCarousel === 'function') {
    new owlCarousel(clientsList, {
      items: 6,
      autoplay: true,
      smartSpeed: 700,
      loop: true,
      dots: false,
      autoplayHoverPause: true,
      responsive: {
        0: { items: 1 },
        480: { items: 3 },
        768: { items: 5 },
        992: { items: 6 }
      }
    });
  }

  const thought = document.getElementById('thought');
  if (thought && typeof owlCarousel === 'function') {
    new owlCarousel(thought, {
      autoplay: true,
      autoplayTimeout: 3000,
      loop: true,
      margin: 20,
      autoplayHoverPause: true,
      dots: false,
      responsive: {
        0: { items: 2 },
        768: { items: 4 },
        992: { items: 6 }
      }
    });
  }

  const ourrefs = document.getElementById('ourrefs');
  if (ourrefs && typeof owlCarousel === 'function') {
    new owlCarousel(ourrefs, {
      autoplay: true,
      autoplayTimeout: 1750,
      loop: true,
      margin: 10,
      autoplayHoverPause: true,
      responsive: {
        0: { dots: false, items: 3 },
        480: { dots: false, items: 3 },
        768: { items: 4 },
        992: { items: 8 }
      }
    });
  }

  const customersTestimonials = document.getElementById('customers-testimonials');
  if (customersTestimonials && typeof owlCarousel === 'function') {
    new owlCarousel(customersTestimonials, {
      items: 1,
      autoplay: true,
      smartSpeed: 700,
      loop: true,
      autoplayHoverPause: true
    });
  }

  // Thumbnail blogs hover effect
  const thumbnailBlogs = document.querySelectorAll('.thumbnail-blogs');
  thumbnailBlogs.forEach(thumbnail => {
    thumbnail.addEventListener('mouseenter', function() {
      const caption = this.querySelector('.caption');
      if (caption) {
        caption.style.display = 'block';
        const height = caption.scrollHeight;
        caption.style.height = 0;
        caption.style.overflow = 'hidden';
        caption.style.transition = 'height 250ms';
        requestAnimationFrame(() => {
          caption.style.height = height + 'px';
        });
      }
    });
    
    thumbnail.addEventListener('mouseleave', function() {
      const caption = this.querySelector('.caption');
      if (caption) {
        caption.style.transition = 'height 205ms';
        caption.style.height = 0;
        setTimeout(() => {
          caption.style.display = 'none';
        }, 205);
      }
    });
  });

  // Form validation and submission
  function setupValidationForm(selector, isAjax) {
    const forms = document.querySelectorAll(selector);
    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        let result = true;
        const msg = this.getAttribute('data-msg');
        
        const inputs = this.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
          if (input.hasAttribute('required')) {
            const val = getVal(input);
            const type = input.getAttribute('type');
            if (val === null || (type === 'email' && !isEmail(val))) {
              input.classList.remove('is-valid');
              input.classList.add('is-invalid');
              if (result) doToast('e', msg);
              result = false;
              e.preventDefault();
            } else {
              input.classList.remove('is-invalid');
              input.classList.add('is-valid');
            }
          }
        });
        
        if (isAjax && result) {
          e.preventDefault();
          const formData = new FormData(this);
          
          fetch(this.action, {
            method: this.method,
            body: formData
          })
          .then(response => response.json())
          .then(data => {
            doToast(data.type, data.content);
            if (data.refresh) location.reload();
          })
          .catch(error => {
            alert(error);
          });
          
          return false;
        }
      });
    });
  }
  
  setupValidationForm('.doValidateAndSend', false);
  setupValidationForm('.doValidateAndAjax', true);

  // Contact form
  const formContact = document.getElementById('form-contact');
  if (formContact) {
    formContact.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const errorMessages = this.querySelectorAll('.error-message, .sent-message');
      errorMessages.forEach(el => el.style.display = 'none');
      
      const namesurname = document.getElementById('namesurname').value;
      const phone = document.getElementById('phone').value;
      const subject = document.getElementById('subject').value;
      const email = document.getElementById('email').value;
      const message = document.getElementById('message').value;

      if (
        namesurname.length < 3 ||
        subject.length < 3 ||
        email.length < 3 ||
        phone.length < 3 ||
        message.length < 3
      ) {
        const errorMessage = this.querySelector('.error-message');
        if (errorMessage) {
          errorMessage.innerHTML = errorMessage.getAttribute('data-msg');
          errorMessage.style.display = 'block';
          // Simple fade in effect
          errorMessage.style.opacity = 0;
          setTimeout(() => {
            errorMessage.style.transition = 'opacity 200ms';
            errorMessage.style.opacity = 1;
          }, 10);
        }
      } else {
        const formButtons = this.querySelectorAll('button');
        formButtons.forEach(button => button.disabled = true);
        
        const loadingForm = document.querySelector('.loading-form');
        if (loadingForm) loadingForm.style.display = 'block';
        
        const formData = new FormData(this);
        const params = new URLSearchParams();
        for (const pair of formData) {
          params.append(pair[0], pair[1]);
        }
        
        fetch(this.action, {
          method: this.method,
          body: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })
        .then(response => response.json())
        .then(data => {
          if (loadingForm) loadingForm.style.display = 'none';
          
          if (data.type === 'e') {
            const errorMessage = this.querySelector('.error-message');
            if (errorMessage) {
              errorMessage.innerHTML = data.content;
              errorMessage.style.display = 'block';
              // Simple fade in effect
              errorMessage.style.opacity = 0;
              setTimeout(() => {
                errorMessage.style.transition = 'opacity 200ms';
                errorMessage.style.opacity = 1;
              }, 10);
            }
            
            formButtons.forEach(button => button.disabled = false);
          } else {
            const sentMessage = this.querySelector('.sent-message');
            if (sentMessage) {
              sentMessage.innerHTML = data.content;
              sentMessage.style.display = 'block';
              // Simple fade in effect
              sentMessage.style.opacity = 0;
              setTimeout(() => {
                sentMessage.style.transition = 'opacity 200ms';
                sentMessage.style.opacity = 1;
              }, 10);
            }
          }
        })
        .catch(error => {
          alert(error);
        });
      }
      
      return false;
    });
  }

  // Dropdown fix for mobile with animation - using event delegation
  document.addEventListener('click', function(e) {
    // Only handle dropdowns that are NOT in the Angular navbar component
    if (e.target.closest('.navbar-nav .dropdown-toggle') && !e.target.closest('app-navbar')) {
      if (window.innerWidth < 992 && clickEnabled) {
        e.preventDefault();
        const parent = e.target.closest('.dropdown');
        const menu = parent.querySelector('.dropdown-menu');
        
        // Close other open dropdowns with animation
        const openDropdowns = document.querySelectorAll('.navbar .dropdown-menu.show:not([id^="navbarResponsive"] .dropdown-menu)');
        openDropdowns.forEach(dropdown => {
          if (dropdown !== menu) {
            // Slide up animation for other dropdowns
            const dropdownParent = dropdown.closest('.dropdown');
            dropdown.style.height = dropdown.scrollHeight + 'px';
            dropdown.style.transition = 'height 200ms';
            dropdown.style.overflow = 'hidden';
            
            setTimeout(() => {
              dropdown.style.height = '0';
              setTimeout(() => {
                dropdown.classList.remove('show');
                dropdown.style.display = 'none';
                dropdown.removeAttribute('style');
              }, 200);
            }, 10);
          }
        });
        
        if (menu.classList.contains('show')) {
          // Close this dropdown (slide up animation)
          menu.style.height = menu.scrollHeight + 'px';
          menu.style.transition = 'height 200ms';
          menu.style.overflow = 'hidden';
          
          setTimeout(() => {
            menu.style.height = '0';
            setTimeout(() => {
              menu.classList.remove('show');
              menu.style.display = 'none';
              menu.removeAttribute('style');
            }, 200);
          }, 10);
        } else {
          // Open this dropdown (slide down animation)
          menu.classList.add('show');
          menu.style.display = 'block';
          menu.style.height = '0';
          menu.style.overflow = 'hidden';
          menu.style.transition = 'height 200ms';
          const height = menu.scrollHeight;
          
          setTimeout(() => {
            menu.style.height = height + 'px';
            setTimeout(() => {
              menu.style.height = '';
              menu.style.overflow = '';
              menu.style.transition = '';
            }, 200);
          }, 10);
        }
      }
    }
  });

  // Close dropdowns when burger menu is closed
  const navbarTogglers = document.querySelectorAll('.navbar-toggler:not(app-navbar .navbar-toggler)');
  navbarTogglers.forEach(toggler => {
    toggler.addEventListener('click', function() {
      const navbarCollapse = document.querySelector('.navbar-collapse:not(app-navbar .navbar-collapse)');
      if (navbarCollapse && !navbarCollapse.classList.contains('show')) {
        const openDropdowns = document.querySelectorAll('.navbar .dropdown-menu.show:not(app-navbar .dropdown-menu)');
        openDropdowns.forEach(dropdown => {
          // Close all dropdowns when navbar is closed
          dropdown.classList.remove('show');
          dropdown.style.display = 'none';
          dropdown.removeAttribute('style');
        });
      }
    });
  });

  // Reset dropdown menus
  function resetDropdownMenus() {
    const dropdownMenus = document.querySelectorAll('.navbar .dropdown-menu');
    dropdownMenus.forEach(menu => {
      menu.removeAttribute('style');
      menu.classList.remove('show');
    });
  }
  
  // Handle resize events for responsive behavior
  window.addEventListener('resize', function() {
    const currentWidth = window.innerWidth;
    const wasMobile = isMobile;
    isMobile = currentWidth < 992;
    
    // Only take action if we've crossed the breakpoint
    if (wasMobile !== isMobile) {
      if (isMobile) {
        // Switching from desktop to mobile
        disableHoverMode();
        clickEnabled = true;
        // Reset any open dropdowns
        resetDropdownMenus();
      } else {
        // Switching from mobile to desktop
        resetDropdownMenus();
        enableHoverMode();
        clickEnabled = false;
      }
    }
    
    // Additional reset for desktop
    if (currentWidth >= 992) {
      resetDropdownMenus();
    }
  });
  
  // Angular navbar collapse event trigger for desktop
  function setNavbarOpenOnDesktop() {
    if (window.innerWidth >= 992) {
      if (window.ng && window.ng.getComponent) {
        const navbarComponent = window.ng.getComponent(document.querySelector('app-navbar'));
        if (navbarComponent) {
          navbarComponent.isNavbarCollapsed = false;
        }
      }
    }
  }
  
  window.addEventListener('resize', setNavbarOpenOnDesktop);
  setNavbarOpenOnDesktop();
});

// Email validation function
function isEmail(email) {
  const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

// Get value from form element
function getVal(elem) {
  let result = null;
  const tagName = elem.tagName;
  
  switch (tagName) {
    case 'INPUT':
      const type = elem.type;
      switch (type) {
        case 'text':
        case 'email':
        case 'file':
        case 'number':
        case 'password':
          const val = elem.value;
          if (val !== '') result = val;
          break;
        case 'radio':
        case 'checkbox':
          if (elem.checked) result = elem.value;
          break;
      }
      break;
    case 'SELECT':
      const selectedOption = elem.options[elem.selectedIndex];
      const selectedVal = selectedOption ? selectedOption.value : '';
      if (selectedVal !== '-1') result = selectedVal;
      break;
    case 'TEXTAREA':
      const textVal = elem.value;
      if (textVal !== '') result = textVal;
      break;
    default:
      result = null;
      break;
  }
  
  return result;
}

// Toast notification function
function doToast(ttype, tmsg) {
  // Assuming toastr library is still used
  switch (ttype) {
    case 's':
      toastr.success(tmsg);
      break;
    case 'w':
      toastr.warning(tmsg);
      break;
    case 'i':
      toastr.info(tmsg);
      break;
    case 'e':
      toastr.error(tmsg);
      break;
    default:
      toastr.info(tmsg);
      break;
  }
}

// Scroll event handler
window.addEventListener('scroll', function() {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const nav = document.querySelector('nav');
  const backToTop = document.getElementById('back-to-top');
  
  if (scrollTop < 50) {
    if (nav) nav.classList.remove('vesco-top-nav');
    if (backToTop) backToTop.style.display = 'none';
  } else {
    if (nav) nav.classList.add('vesco-top-nav');
    if (backToTop) backToTop.style.display = 'block';
  }
});
