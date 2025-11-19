import { ApplicationConfig, provideZoneChangeDetection, LOCALE_ID, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { authInterceptor } from './interceptors/auth.interceptor';

import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideHttpClient(withInterceptors([authInterceptor])),
    { provide: LOCALE_ID, useValue: 'pt-BR' },

    importProvidersFrom(
      BrowserAnimationsModule, // <- alterado aqui
      ToastrModule.forRoot({
        positionClass: 'toast-top-center', // ou 'toast-top-right'
        timeOut: 3000,
        closeButton: true,
        progressBar: true,
        easeTime: 300,
        tapToDismiss: true
      })
    )
    ]
 
};
