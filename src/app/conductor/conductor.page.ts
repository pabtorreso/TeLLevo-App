import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { UserModel } from 'src/app/models/UserModel';

@Component({
  selector: 'app-conductor',
  templateUrl: './conductor.page.html',
  styleUrls: ['./conductor.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConductorPage implements OnInit {

  adminInfoReceived: UserModel | undefined;

  constructor(private r: Router) {
    this.adminInfoReceived = this.r.getCurrentNavigation()?.extras.state?.['user'];
   }

  ngOnInit() {
  }

}