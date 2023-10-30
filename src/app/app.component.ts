import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent {
  constructor() {}
}
