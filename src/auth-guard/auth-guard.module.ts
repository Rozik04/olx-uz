import { Module } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';
import { AuthGuardController } from './auth-guard.controller';

@Module({
  controllers: [AuthGuardController],
  providers: [AuthGuardService],
})
export class AuthGuardModule {}
