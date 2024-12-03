import { Injectable } from '@nestjs/common';
import { EntityFactory, AuthUser } from '@project/shared-types';
import { UserEntity } from './user.entity';

@Injectable()
export class UserFactory implements EntityFactory<UserEntity> {
  public create(entityPlainData: AuthUser): UserEntity {
    return new UserEntity(entityPlainData);
  }
}
