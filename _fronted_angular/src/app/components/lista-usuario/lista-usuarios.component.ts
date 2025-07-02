import { Component, OnInit } from '@angular/core';
import { UserService, UserDto} from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css'],
   imports: [CommonModule, ReactiveFormsModule],
})
export class UserListComponent implements OnInit {
  users: UserDto[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAll().subscribe({
      next: data => this.users = data,
      error: err => console.error('Error cargando usuarios:', err)
    });
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Seguro que deseas eliminar este usuario?')) {
      this.userService.delete(id).subscribe({
        next: () => this.users = this.users.filter(u => u.codUsua !== id),
        error: err => alert('Error eliminando usuario: ' + (err.error?.message || err.statusText))
      });
    }
  }
}
