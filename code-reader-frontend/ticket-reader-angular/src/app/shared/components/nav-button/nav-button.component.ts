import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-button',
  standalone: true,  // Indicar que el componente es standalone
  templateUrl: './nav-button.component.html',
  styleUrls: ['./nav-button.component.css'],
  imports: [] // Añade las importaciones necesarias si estás usando directivas como *ngIf o *ngFor
})
export class NavButtonComponent {
  constructor(private router: Router) {}

  goToWelcome() {
    this.router.navigate(['/welcome']);
  }
}
