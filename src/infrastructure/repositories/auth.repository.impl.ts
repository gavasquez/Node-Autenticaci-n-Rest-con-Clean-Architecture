import { AuthRepository, RegisterUserDto, UserEntity } from '../../domain';
import { AuthDatasource } from '../../domain/datasources/auth.datasource';


export class AuthRepositoryImpl implements AuthRepository {

  constructor(
    private readonly datasource: AuthDatasource,
  ) {}

  register( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
    return this.datasource.register(registerUserDto);
  }

}