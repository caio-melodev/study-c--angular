import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // <-- Corrigimos para importar AppComponent

// A função bootstrapApplication inicia a aplicação Angular.
// Ela recebe nosso componente principal (AppComponent) e as configurações (appConfig) como argumentos.
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));