import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[PrismaModule, JwtModule.register({global:true, signOptions:{expiresIn:"2h"}, secret:"mysecret"})],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
