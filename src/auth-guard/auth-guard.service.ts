import { Injectable } from '@nestjs/common';
import { CreateAuthGuardDto } from './dto/create-auth-guard.dto';
import { UpdateAuthGuardDto } from './dto/update-auth-guard.dto';

@Injectable()
export class AuthGuardService {
  create(createAuthGuardDto: CreateAuthGuardDto) {
    return 'This action adds a new authGuard';
  }

  findAll() {
    return `This action returns all authGuard`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authGuard`;
  }

  update(id: number, updateAuthGuardDto: UpdateAuthGuardDto) {
    return `This action updates a #${id} authGuard`;
  }

  remove(id: number) {
    return `This action removes a #${id} authGuard`;
  }
}
