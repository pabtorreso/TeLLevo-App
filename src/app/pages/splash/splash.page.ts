import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {
  constructor(private route: Router) {}
  

  ngOnInit() {
    setTimeout(() => {
      // Navegar a la página principal después de 3 segundos
      this.route.navigate(['/login'], { replaceUrl: true });
    }, 3000); // Tiempo en milisegundos
  }
}
