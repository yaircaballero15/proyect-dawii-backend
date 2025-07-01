import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthStorageService } from 'src/app/services/auth-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,

  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class NavbarComponent {
  constructor(public authStorageService: AuthStorageService) { }

  logout() {
    this.authStorageService.clear();
  }
}
