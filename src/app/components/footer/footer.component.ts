import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { BackToTopDirective } from '../../directives/back-to-top.directive';
import { ContactService } from '../../services/contact.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, BackToTopDirective,NgIf],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  showContactOptions = false;
  selectedPhone: string | null = null;

  constructor(
    private scrollService: ScrollService,
    public contactService: ContactService
  ) {
    this.contactService.showContactOptions$.subscribe(val => this.showContactOptions = val);
    this.contactService.selectedPhone$.subscribe(val => this.selectedPhone = val);
  }

  // Method to scroll to top when clicking on footer links
  scrollToTop() {
    this.scrollService.scrollToTop();
  }

  openContactOptions(phone: string, event: Event) {
    this.contactService.openContactOptions(phone, event);
  }

  closeContactOptions() {
    this.contactService.closeContactOptions();
  }

  goToWhatsApp(phone: string | null) {
    this.contactService.goToWhatsApp(phone);
  }

  callPhone(phone: string | null) {
    this.contactService.callPhone(phone);
  }
}
