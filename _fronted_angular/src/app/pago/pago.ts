import { Component, ChangeDetectorRef,AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tarjeta',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pago.html', // Cambia si tu HTML se llama diferente
  styleUrls: ['./pago.css']   // Cambia si tu CSS se llama diferente
})


export class TarjetaComponent implements AfterViewInit {

  // 🧠 ViewChild para manipular directamente elementos del DOM
  @ViewChild('tarjeta') tarjetaRef!: ElementRef<HTMLDivElement>;
  @ViewChild('logoMarca') logoMarcaRef!: ElementRef<HTMLDivElement>;
  @ViewChild('numero') numeroRef!: ElementRef<HTMLParagraphElement>;
  @ViewChild('nombre') nombreRef!: ElementRef<HTMLParagraphElement>;
  @ViewChild('firma') firmaRef!: ElementRef<HTMLParagraphElement>;
  @ViewChild('mes') mesRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('year') yearRef!: ElementRef<HTMLSpanElement>;
  @ViewChild('ccv') ccvRef!: ElementRef<HTMLParagraphElement>;

  // 📦 Propiedades que se enlazan al formulario
  inputNumero: string = '';
  inputNombre: string = '';
  inputCCV: string = '';
  selectMes: string = '';
  selectYear: string = '';

  meses: number[] = [];
  anios: number[] = [];

  // 👇 Esto controla la visibilidad del formulario
  formularioAbierto: boolean = false;

  // 🕒 Inicializa el rango de años al cargar la vista
  ngAfterViewInit(): void {
    this.meses = Array.from({ length: 12 }, (_, i) => i + 1);
    const anioActual = new Date().getFullYear();
    this.anios = Array.from({ length: 9 }, (_, i) => anioActual + i);

     this.cdr.detectChanges();
  }

  // 🔁 Alternar lado de la tarjeta
  toggleTarjeta() {
    this.tarjetaRef.nativeElement.classList.toggle('active');
  }

  // 👁️ Mostrar lado frontal
  mostrarFrente() {
    this.tarjetaRef.nativeElement.classList.remove('active');
  }

  // 🔢 Actualizar número de tarjeta
  actualizarNumeroTarjeta(event: Event) {
    const input = (event.target as HTMLInputElement).value
      .replace(/\s/g, '')
      .replace(/\D/g, '')
      .replace(/([0-9]{4})/g, '$1 ')
      .trim();

    this.inputNumero = input;
    this.numeroRef.nativeElement.textContent = input || '#### #### #### ####';
    this.logoMarcaRef.nativeElement.innerHTML = '';

     if (input.startsWith('4')) {
  const img = document.createElement('img');
  img.src = 'assets/visa.png';
  img.style.height = '72px';
  img.style.objectFit = 'contain';
  img.style.display = 'block';
  this.logoMarcaRef.nativeElement.innerHTML = '';
  this.logoMarcaRef.nativeElement.appendChild(img);
} else if (input.startsWith('5')) {
  const img = document.createElement('img');
  img.src = 'assets/mastercard.png';
  img.style.height = '72px';
  img.style.objectFit = 'contain';
  img.style.display = 'block';
  this.logoMarcaRef.nativeElement.innerHTML = '';
  this.logoMarcaRef.nativeElement.appendChild(img);
}


    this.mostrarFrente();
  }

  // 🧑 Actualizar nombre del titular
  actualizarNombre(event: Event) {
    const nombre = (event.target as HTMLInputElement).value.replace(/[0-9]/g, '');
    this.inputNombre = nombre;
    this.nombreRef.nativeElement.textContent = nombre || 'Jhon Doe';
    this.firmaRef.nativeElement.textContent = nombre;
    this.mostrarFrente();
  }
constructor(private cdr: ChangeDetectorRef) {}

  // 📆 Selección de mes
  actualizarMes(event: Event) {
    this.selectMes = (event.target as HTMLSelectElement).value;
    this.mesRef.nativeElement.textContent = this.selectMes;
    this.mostrarFrente();
  }

  // 📅 Selección de año
  actualizarYear(event: Event) {
    this.selectYear = (event.target as HTMLSelectElement).value;
    this.yearRef.nativeElement.textContent = this.selectYear.slice(2);
    this.mostrarFrente();
  }

  // 🔒 Actualización del CCV
  actualizarCCV(event: Event) {
    if (!this.tarjetaRef.nativeElement.classList.contains('active')) {
      this.tarjetaRef.nativeElement.classList.add('active');
    }

    const ccv = (event.target as HTMLInputElement).value.replace(/\s/g, '').replace(/\D/g, '');
    this.inputCCV = ccv;
    this.ccvRef.nativeElement.textContent = ccv;
  }

  // 🎛️ Alternar el formulario si lo usás con botón
  toggleFormulario() {
    this.formularioAbierto = !this.formularioAbierto;
      console.log('Formulario abierto:', this.formularioAbierto);
       this.cdr.detectChanges(); // 🛠️ Forzar actualización del DOM
  }
}
