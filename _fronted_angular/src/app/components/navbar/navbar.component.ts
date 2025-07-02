import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class NavbarComponent {
  mostrarLogout = false;

  constructor(public tokenService: TokenService, private router: Router) {}

  toggleLogout() {
    this.mostrarLogout = !this.mostrarLogout;
  }

  logout() {
    this.tokenService.clear();
    this.mostrarLogout = false;
    this.router.navigate(['/']); 
  }
}
