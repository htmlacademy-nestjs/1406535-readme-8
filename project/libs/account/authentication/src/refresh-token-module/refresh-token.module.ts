import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RefreshTokenModel, RefreshTokenSchema } from './refresh-token.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: RefreshTokenModel.name, schema: RefreshTokenSchema }
  ])],
  providers: [
    RefreshTokenService,
    RefreshTokenRepository,
    RefreshTokenFactory,
  ],
  exports: [
    RefreshTokenService,
  ]
})
export class RefreshTokenModule {}
