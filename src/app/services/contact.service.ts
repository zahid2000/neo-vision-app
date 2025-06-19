import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private _showContactOptions = new BehaviorSubject<boolean>(false);
  private _selectedPhone = new BehaviorSubject<string | null>(null);

  showContactOptions$ = this._showContactOptions.asObservable();
  selectedPhone$ = this._selectedPhone.asObservable();

  openContactOptions(phone: string, event?: Event) {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this._selectedPhone.next(phone);
    this._showContactOptions.next(true);
  }

  closeContactOptions() {
    this._showContactOptions.next(false);
    this._selectedPhone.next(null);
  }

  goToWhatsApp(phone: string | null) {
    if (!phone) return;
    const waLink = `https://wa.me/${phone.replace(/[^\d]/g, '')}`;
    window.open(waLink, '_blank');
    this.closeContactOptions();
  }

  callPhone(phone: string | null) {
    if (!phone) return;
    window.location.href = `tel:${phone}`;
    this.closeContactOptions();
  }
} 