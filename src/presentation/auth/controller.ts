import { Request, Response } from 'express';
import { AuthRepository, CustomError, RegisterUser, RegisterUserDto } from '../../domain';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { LoginUser } from '../../domain/usecases/auth/login-user.use-case';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';


export class AuthController {
  //DI
  constructor(
    private readonly authRepository: AuthRepository,
  ) { }

  private handleError = ( error: unknown, res: Response ) => {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }
    console.log( error );
    return res.status( 500 ).json( { error: 'Internal Server Error' } );
  };

  registerUser = ( req: Request, res: Response ) => {
    const [ error, registerUserDto ] = RegisterUserDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );
    /* this.authRepository.register( registerUserDto! )
      .then( async ( user ) => {
        res.json(
          {
            user,
            token: await JwtAdapter.generateToken( { id: user.id } )
          } );
      } )
      .catch( error => this.handleError( error, res ) ); */
    new RegisterUser( this.authRepository, JwtAdapter.generateToken ).execute( registerUserDto! )
      .then( data => res.json( data ) )
      .catch( error => this.handleError( error, res ) );
  };

  loginUser = async ( req: Request, res: Response ) => {
    const [ error, loginUserDto ] = LoginUserDto.create( req.body );
    if ( error ) return res.status( 400 ).json( { error } );
    new LoginUser( this.authRepository, JwtAdapter.generateToken ).execute( loginUserDto! )
      .then( data => res.json( data ) )
      .catch( error => this.handleError( error, res ) );
  };

  getUsers = async ( req: Request, res: Response ) => {
    UserModel.find().then( users => res.json( { users, user: req.body.user } ) )
      .catch( () => res.status( 500 ).json( { error: 'Internal server error' } ) );
  };
}