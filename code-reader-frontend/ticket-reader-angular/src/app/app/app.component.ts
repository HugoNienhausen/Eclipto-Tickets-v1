import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavButtonComponent } from '../shared/components/nav-button/nav-button.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ticket-reader-angular';
}
