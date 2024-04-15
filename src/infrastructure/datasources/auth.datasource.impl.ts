import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb';
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from '../../domain';
import { UserMapper } from '../mappers/user.mapper';

type HashFunction = ( password: string ) => string;
type CompareFunction = ( password: string, hashed: string ) => boolean;

export class AuthDatasourceImpl implements AuthDatasource {

  constructor(
    private readonly hasdPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare,
  ) { }


  async register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try {
      // 1. Verificar si el correo existe
      const exist = await UserModel.findOne( {
        email: email
      } );
      if ( exist ) throw CustomError.badRequest( 'User already exists' );
      const user = await UserModel.create( {
        name: name,
        email: email,
        // 2. hash de la contraseña
        password: this.hasdPassword( password ),
      } );
      await user.save();
      // 3. Mapear la respuesta a nuestra entindad
      return UserMapper.UserEntityFromObject( user );
    } catch ( error ) {
      if ( error instanceof CustomError ) {
        throw error;
      }
      throw CustomError.internalServerError();
    }
  }

}