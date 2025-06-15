import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-video',
  standalone: true,
  imports: [],
  templateUrl: './home-video.component.html',
  styleUrl: './home-video.component.scss'
})
export class HomeVideoComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    // Ensure video plays after component is initialized
    if (this.videoElement?.nativeElement) {
      const video = this.videoElement.nativeElement;
      
      // Try to play the video
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Auto-play was prevented, handle the error
          console.log('Video autoplay was prevented:', error);
          
          // Add a click event listener to play the video on user interaction
          document.addEventListener('click', () => {
            video.play();
          }, { once: true });
        });
      }
    }
  }
}
