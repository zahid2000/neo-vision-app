import { Component } from '@angular/core';
import { FooterContactComponent } from "../footer-contact/footer-contact.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-how-it-works',
  imports: [FooterContactComponent, CommonModule],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.scss'
})
export class HowItWorksComponent {
  activeTab = 'nav-2';

  setTab(tab: string) {
    this.activeTab = tab;
  }
}
