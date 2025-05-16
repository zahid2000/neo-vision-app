import { Component } from '@angular/core';
import { HomeCarouselComponent } from "./home-carousel/home-carousel.component";

@Component({
  selector: 'app-home',
  imports: [HomeCarouselComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
