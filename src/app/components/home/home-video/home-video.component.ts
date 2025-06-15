import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-video',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-video.component.html',
  styleUrl: './home-video.component.scss'
})
export class HomeVideoComponent implements AfterViewInit, OnDestroy {
  @ViewChild('videoElement') videoElement!: ElementRef<HTMLVideoElement>;
  
  private videoObserver: IntersectionObserver | null = null;
  
  ngAfterViewInit(): void {
    if (this.videoElement?.nativeElement) {
      // Create an intersection observer to play the video when it's visible
      this.videoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.playVideo();
            } else {
              this.pauseVideo();
            }
          });
        },
        { threshold: 0.1 } // Trigger when 10% of the video is visible
      );
      
      // Start observing the video element
      this.videoObserver.observe(this.videoElement.nativeElement);
      
      // Also try to play the video immediately
      this.playVideo();
    }
  }
  
  ngOnDestroy(): void {
    // Clean up the observer when component is destroyed
    if (this.videoObserver) {
      this.videoObserver.disconnect();
      this.videoObserver = null;
    }
  }
  
  private playVideo(): void {
    const video = this.videoElement.nativeElement;
    
    // Make sure the video is muted to allow autoplay
    video.muted = true;
    
    // Try to play the video
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(error => {
        console.error('Video playback error:', error);
        
        // If autoplay was prevented, try again on user interaction
        document.addEventListener('click', () => {
          video.play().catch(err => console.error('Video play error after click:', err));
        }, { once: true });
      });
    }
  }
  
  private pauseVideo(): void {
    const video = this.videoElement.nativeElement;
    if (!video.paused) {
      video.pause();
    }
  }
}
