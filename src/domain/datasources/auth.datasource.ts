import { UserEntity } from '../entities/user.entity';
import { LoginUserDto, RegisterUserDto } from '../../domain';


export abstract class AuthDatasource {
  // todo:
  abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>;
  abstract register( registerUserDto: RegisterUserDto ): Promise<UserEntity>;
}