import { Injectable } from '@nestjs/common';
import { EntityFactory, JwtToken } from '@project/shared-types';
import { RefreshTokenEntity } from './refresh-token.entity';

@Injectable()
export class RefreshTokenFactory implements EntityFactory<RefreshTokenEntity> {
  public create(entityPlainData: JwtToken): RefreshTokenEntity {
    return new RefreshTokenEntity(entityPlainData);
  }
}
