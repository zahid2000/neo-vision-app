import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ScrollService } from '../../services/scroll.service';
import { BackToTopDirective } from '../../directives/back-to-top.directive';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, BackToTopDirective],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  constructor(private scrollService: ScrollService) {}

  // Method to scroll to top when clicking on footer links
  scrollToTop() {
    this.scrollService.scrollToTop();
  }
}
