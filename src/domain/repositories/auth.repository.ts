import { UserEntity } from '../entities/user.entity';
import { LoginUserDto, RegisterUserDto } from '../../domain';


export abstract class AuthRepository {
  // todo:
  abstract login(loginUserDto: LoginUserDto):Promise<UserEntity>;
  abstract register( registerUserDto: RegisterUserDto ): Promise<UserEntity>;
}