import { Component, AfterViewInit } from '@angular/core';
import { Fancybox } from '@fancyapps/ui';

@Component({
  selector: 'app-galery',
  imports: [],
  templateUrl: './galery.component.html',
  styleUrl: './galery.component.scss'
})
export class GaleryComponent implements AfterViewInit {
  ngAfterViewInit() {
    Fancybox.bind('[data-fancybox="gallery"]', {
      // Burada əlavə konfiqurasiya əlavə edə bilərsiniz
    });
  }
}
