import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-upper-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upper-menu.component.html',
  styleUrl: './upper-menu.component.css'
})
export class UpperMenuComponent {
  @Input() isSidebarCollapsed: boolean = false;
  isProfileMenuOpen: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toggleProfileMenu() {
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/welcome']);
  }

  goToProfile() {
    this.router.navigate(['/user/profile']);
    this.isProfileMenuOpen = false;
  }
}