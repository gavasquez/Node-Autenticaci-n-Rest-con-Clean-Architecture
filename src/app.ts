import { envs } from './config';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

( () => {
  main();
} )();


async function main() {
  //* await base de datos


  //* Inicio de nuestro server
  new Server( { port: envs.PORT, routes: AppRoutes.routes } ).start();
}