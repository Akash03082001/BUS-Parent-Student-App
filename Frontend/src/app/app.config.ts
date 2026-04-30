import { ApplicationConfig } from '@angular/core';
import { provideRouter,withHashLocation } from '@angular/router';
import { routes } from './app.routes';
import { RouteReuseStrategy } from '@angular/router';
import { NoReuseStrategy } from './app/no-reuse.strategy/no-reuse.strategy';

import {
  provideHttpClient,
  withInterceptorsFromDi
} from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withHashLocation()),

    // ✅ Required for HttpClient in standalone apps
    provideHttpClient(
      withInterceptorsFromDi()
    ),

    { provide: RouteReuseStrategy, useClass: NoReuseStrategy },

    // ✅ Interceptor registration (NOW it works)
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};
