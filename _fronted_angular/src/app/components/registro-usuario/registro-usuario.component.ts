import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class RegistroUsuarioComponent {
  registroForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registroForm = this.fb.group({
      nom_usua: ['', Validators.required],
      ape_usua: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      clave: ['', Validators.required],
      fna_usua: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.authService.registrar(this.registroForm.value).subscribe(
        res => console.log('Usuario registrado', res),
        err => console.error(err)
      );
    }
  }
}