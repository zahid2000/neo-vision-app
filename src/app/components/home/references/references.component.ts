import { Component, AfterViewInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-references',
  imports: [],
  templateUrl: './references.component.html',
  styleUrl: './references.component.scss',
})
export class ReferencesComponent implements AfterViewInit {
  ngAfterViewInit() {
    ($('.owl-carousel') as any).owlCarousel({
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
    });
  }
}
