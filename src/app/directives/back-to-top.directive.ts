import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { ScrollService } from '../services/scroll.service';

@Directive({
  selector: '[appBackToTop]',
  standalone: true
})
export class BackToTopDirective implements OnInit {
  private isVisible = false;
  private scrollThreshold = 300; // Show button after scrolling this many pixels

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {
    // Hide the button initially
    this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
    
    // Add click event listener
    this.renderer.listen(this.el.nativeElement, 'click', () => {
      this.scrollService.scrollToTop();
    });
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollPosition > this.scrollThreshold && !this.isVisible) {
      // Show the button
      this.renderer.setStyle(this.el.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '1');
      this.isVisible = true;
    } else if (scrollPosition <= this.scrollThreshold && this.isVisible) {
      // Hide the button
      this.renderer.setStyle(this.el.nativeElement, 'opacity', '0');
      setTimeout(() => {
        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
      }, 300); // Transition duration
      this.isVisible = false;
    }
  }
} 