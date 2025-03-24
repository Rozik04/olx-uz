import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtAuthGuard } from 'src/auth-guard/auth.guard';
import { JwtModule } from '@nestjs/jwt';

@Module({
 imports:[PrismaModule, JwtModule.register({secret:"mysecret", signOptions:{expiresIn:"2h"}, global:true})],
  controllers: [LikeController],
  providers: [LikeService]
})
export class LikeModule {}
