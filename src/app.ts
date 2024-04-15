import { envs } from './config';
import { MongoDatabase } from './data/mongodb';
import { AppRoutes } from './presentation/routes';
import { Server } from './presentation/server';

( () => {
  main();
} )();


async function main() {
  //* await base de datos
  await MongoDatabase.connect( {
    dbName: envs.MONGO_DB_NAME,
    mongoUrl: envs.MONGO_URL,
  } );

  //* Inicio de nuestro server
  new Server( { port: envs.PORT, routes: AppRoutes.routes } ).start();
}