import { Router } from 'express';
import { AuthController } from './controller';
import { AuthDatasourceImpl, AuthRepositoryImpl } from '../../infrastructure';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {

  static get routes(): Router {
    const router = Router();
    const datasource = new AuthDatasourceImpl();
    const AuthRepository = new AuthRepositoryImpl( datasource );
    const controller = new AuthController( AuthRepository );
    //* Definir rutas
    router.post( '/login', controller.loginUser );
    router.post( '/register', controller.registerUser );
    router.get( '/', [ AuthMiddleware.validateJWT ], controller.getUsers );
    //router.use('/api/user');
    return router;
  }
}