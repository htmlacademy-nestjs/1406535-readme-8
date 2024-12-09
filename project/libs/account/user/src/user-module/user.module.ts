import { Module } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserFactory } from './user.factory';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from './user.model';

@Module({
  imports: [MongooseModule.forFeature([
    { name: UserModel.name, schema: UserSchema }
  ])],
  controllers: [UserController],
  providers: [UserRepository, UserFactory, UserService],
  exports: [UserRepository],
})
export class UserModule {

}
