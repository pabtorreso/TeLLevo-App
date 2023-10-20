import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';
import { ConductorModel } from '../models/ConductorModel';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConductorPage implements OnInit {

  conductorInfoReceived: ConductorModel | undefined;

  constructor(private r: Router) {
    this.conductorInfoReceived = this.r.getCurrentNavigation()?.extras.state?.['user'];
   }

  ngOnInit() {
  }

}