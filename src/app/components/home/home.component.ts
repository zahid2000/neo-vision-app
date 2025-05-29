import { Component } from '@angular/core';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { ApplicationAreasComponent } from './application-areas/application-areas.component';
import { FooterContactComponent } from '../footer-contact/footer-contact.component';
import { ReferencesComponent } from "./references/references.component";
import { HomeVideoComponent } from "./home-video/home-video.component";
import { AreasComponent } from "./areas/areas.component";
import { AdvantagesComponent } from "./advantages/advantages.component";

@Component({
  selector: 'app-home',
  imports: [
    HomeCarouselComponent,
    ApplicationAreasComponent,
    FooterContactComponent,
    ReferencesComponent,
    HomeVideoComponent,
    AreasComponent,
    AdvantagesComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
