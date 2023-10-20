import { enableProdMode, importProvidersFrom } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
<<<<<<< HEAD
=======
import { provideAnimations } from '@angular/platform-browser/animations';

>>>>>>> 365552ef4f5321842223bc6c25b6388aeaab0201

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(IonicModule.forRoot({})),
    provideRouter(routes),
<<<<<<< HEAD
  ],
=======
    provideAnimations()
],
>>>>>>> 365552ef4f5321842223bc6c25b6388aeaab0201
});
