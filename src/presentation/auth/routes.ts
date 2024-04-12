import { Router } from 'express';
import { AuthController } from './controller';

export class AuthRoutes {

  static get routes(): Router {
    const router = Router();
    const controller = new AuthController();
    //* Definir todas rutas principales
    router.post( '/login', controller.loginUser );
    router.post( '/register', controller.registerUser );
    //router.use('/api/user');
    return router;
  }
}