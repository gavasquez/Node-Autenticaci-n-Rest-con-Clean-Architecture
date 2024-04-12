import { Request, Response } from 'express';


export class AuthController {
  //DI
  constructor() { }

  registerUser = ( req: Request, res: Response ) => {
    res.json( 'RegisterUser Controller' );
  };


  loginUser = async ( req: Request, res: Response ) => {
    res.json( 'LoginUser Controller' );
  };
}