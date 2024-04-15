import { AuthRepository, RegisterUserDto, UserEntity } from '../../domain';
import { AuthDatasource } from '../../domain/datasources/auth.datasource';
import { LoginUserDto } from '../../domain/dtos/auth/login-user.dto';


export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly datasource: AuthDatasource,
  ) {}

  login( loginUserDto: LoginUserDto ): Promise<UserEntity> {
    return this.datasource.login(loginUserDto);
  }

  register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
    return this.datasource.register(registerUserDto);
  }

}