//função principal do app.config.ts é Importar, registrar e ativar ferramentas para que a aplicação possa usa-las.
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; // importa a ferramenta para fazer chamadas HTTP
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  // o array 'providers' é a lista de serviços e funcionalidades globais que a aplicação vai usar.
  providers: [
    provideRouter(routes),     /* ativa a funcionalidade de roteamento, que gerencia a url do anvegador e decide 
                                qual componente mostrar p o user a cada momento */
    provideHttpClient(),        // ativa o HttpClient, permtiindo a comunicação com a API
    provideAnimations()
  ]                            
};