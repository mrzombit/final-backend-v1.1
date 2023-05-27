import { UserSchema } from './schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: 'User', 
      schema: UserSchema
    }]),
  ],
  controllers: [UserController],
  providers: [UserService,],
  exports: [UserService],
})
export class UserModule {}
