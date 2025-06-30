import { Component } from '@angular/core';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {

  showContactOptions = false;
  selectedPhone: string | null = null;
  
  constructor(private contactService: ContactService) {
    this.contactService.showContactOptions$.subscribe(val => this.showContactOptions = val);
    this.contactService.selectedPhone$.subscribe(val => this.selectedPhone = val);
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
