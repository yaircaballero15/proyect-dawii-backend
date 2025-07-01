import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule,],
})
export class NavbarComponent {
  constructor(public tokenService: TokenService){
    
  }

  logout() {
    this.tokenService.clear();
  }
}
