import { Component, HostListener, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { RouterLink } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductCategory } from '../../models/product.category.model';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  standalone: true,
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
export class NavbarComponent implements OnInit, AfterViewInit {
  isNavbarCollapsed = true;
  isMobile = window.innerWidth <= 992;
  categories: ProductCategory[] = [];
  
  showContactOptions = false;
  selectedPhone: string | null = null;

  constructor(
    private productService: ProductService,
    private renderer: Renderer2,
    public contactService: ContactService
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
    this.contactService.showContactOptions$.subscribe(val => this.showContactOptions = val);
    this.contactService.selectedPhone$.subscribe(val => this.selectedPhone = val);
  }

  ngAfterViewInit(): void {
    this.setupDropdownHandlers();
    this.setupOutsideClickHandler();
  }

  setupDropdownHandlers(): void {
    // Wait for DOM to be ready
    setTimeout(() => {
      // For desktop
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        this.renderer.listen(dropdown, 'mouseenter', () => {
          if (!this.isMobile) {
            dropdown.querySelector('.dropdown-menu')?.classList.add('show');
          }
        });
        
        this.renderer.listen(dropdown, 'mouseleave', () => {
          if (!this.isMobile) {
            dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
          }
        });
      });

      // Handle click on dropdown toggle for mobile
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      dropdownToggles.forEach(toggle => {
        this.renderer.listen(toggle, 'click', (event) => {
          if (this.isMobile) {
            event.preventDefault();
            event.stopPropagation(); // Prevent event bubbling
            
            const parent = (toggle as HTMLElement).closest('.dropdown, .dropdown-submenu');
            const menu = parent?.querySelector('.dropdown-menu');
            
            // Close all other dropdowns first
            document.querySelectorAll('.dropdown-menu.show').forEach(openMenu => {
              if (openMenu !== menu && !parent?.contains(openMenu)) {
                openMenu.classList.remove('show');
              }
            });
            
            if (menu) {
              if (menu.classList.contains('show')) {
                menu.classList.remove('show');
              } else {
                menu.classList.add('show');
              }
            }
          }
        });
      });

      // Handle submenu toggles
      const submenuToggles = document.querySelectorAll('.dropdown-submenu > .dropdown-item');
      submenuToggles.forEach(toggle => {
        this.renderer.listen(toggle, 'click', (event) => {
          if (this.isMobile) {
            event.preventDefault();
            event.stopPropagation(); // Prevent event bubbling
            
            const parent = (toggle as HTMLElement).closest('.dropdown-submenu');
            const menu = parent?.querySelector('.dropdown-menu');
            
            if (menu) {
              if (menu.classList.contains('show')) {
                menu.classList.remove('show');
              } else {
                menu.classList.add('show');
              }
            }
          }
        });
      });
    }, 500);
  }

  setupOutsideClickHandler(): void {
    // Close dropdowns when clicking outside
    this.renderer.listen('document', 'click', (event: Event) => {
      if (this.isMobile) {
        const target = event.target as HTMLElement;
        if (!target.closest('.dropdown-toggle') && !target.closest('.dropdown-menu')) {
          document.querySelectorAll('app-navbar .dropdown-menu.show').forEach(menu => {
            menu.classList.remove('show');
          });
        }
      }
    });
  }

  @HostListener('window:resize')
  onResize() {
    this.isMobile = window.innerWidth <= 992;
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
