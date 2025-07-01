import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // <-- esto es clave

@Component({
selector: 'app-register',
standalone: true,
templateUrl: './register.html',
styleUrls: ['./register.css'],
imports: [FormsModule, CommonModule] // <-- agrégalo aquí también
})
export class RegisterComponent {
aceptaTerminos = false;
mostrarModal = false;
mensajeExito = '';

constructor(private router: Router) {}

mostrarTerminos(event: Event) {
event.preventDefault();
this.mostrarModal = true;
}

cerrarModal() {
this.mostrarModal = false;
}

registrarse(event: Event) {
event.preventDefault();
if (this.aceptaTerminos) {
this.mensajeExito = '¡Registro exitoso!';
setTimeout(() => this.router.navigate(['/home']), 1500);
}
}
}
