import { Component, AfterViewInit } from '@angular/core';

// Define OwlCarousel interfaces for TypeScript
interface OwlCarouselOptions {
  loop?: boolean;
  margin?: number;
  nav?: boolean;
  items?: number;
  autoplay?: boolean;
  autoplayTimeout?: number;
  autoplayHoverPause?: boolean;
  responsive?: {
    [breakpoint: number]: {
      items?: number;
      dots?: boolean;
    };
  };
}

// Define window interface with OwlCarousel
declare global {
  interface Window {
    OwlCarousel?: new (element: Element, options: OwlCarouselOptions) => any;
  }
  interface HTMLElement {
    owlCarousel?: (options: OwlCarouselOptions) => any;
  }
}

@Component({
  selector: 'app-references',
  imports: [],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Find all owl-carousel elements
    const carouselElements = document.querySelectorAll('.owl-carousel');
    
    // Initialize each carousel with vanilla JS
    carouselElements.forEach(element => {
      const options: OwlCarouselOptions = {
        loop: true,
        margin: 10,
        nav: false,
        items: 8,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsive: {
          0: {
            items: 3,
            dots: false,
          },
          600: {
            items: 3,
            dots: false,
          },
          900: {
            items: 4,
          },
          1200: {
            items: 8,
          },
        },
      };

      // Check if the owl carousel constructor exists
      if (window.OwlCarousel) {
        // Initialize with the OwlCarousel constructor directly
        new window.OwlCarousel(element, options);
      } else if (element instanceof HTMLElement && element.owlCarousel) {
        // Fallback to using the element's method if it exists
        element.owlCarousel(options);
      } else {
        console.warn('OwlCarousel is not available, carousel not initialized');
      }
    });
  }
}
