import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('collapse', [
      state('open', style({ height: '*', opacity: 1, overflow: 'unset', visibility: 'visible' })),
      state('closed', style({ height: '0px', opacity: 0, overflow: 'hidden', visibility: 'hidden' })),
      transition('open <=> closed', [
        animate('300ms cubic-bezier(0.4,0,0.2,1)')
      ])
    ])
  ]
})
export class NavbarComponent {
  isNavbarCollapsed = true;
  isMobile = window.innerWidth <= 992;

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 992;
  }
}
