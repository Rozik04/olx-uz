import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthGuardService } from './auth-guard.service';
import { CreateAuthGuardDto } from './dto/create-auth-guard.dto';
import { UpdateAuthGuardDto } from './dto/update-auth-guard.dto';

@Controller('auth-guard')
export class AuthGuardController {
  constructor(private readonly authGuardService: AuthGuardService) {}

  @Post()
  create(@Body() createAuthGuardDto: CreateAuthGuardDto) {
    return this.authGuardService.create(createAuthGuardDto);
  }

  @Get()
  findAll() {
    return this.authGuardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authGuardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthGuardDto: UpdateAuthGuardDto) {
    return this.authGuardService.update(+id, updateAuthGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authGuardService.remove(+id);
  }
}
