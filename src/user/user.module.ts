import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[JwtModule.register({global:true, secret:"mysecret", signOptions:{expiresIn:"2h"}}), PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
