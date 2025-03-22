import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TemporaryService } from './temporary.service';
import { CreateTemporaryDto } from './dto/create-temporary.dto';
import { UpdateTemporaryDto } from './dto/update-temporary.dto';

@Controller('temporary')
export class TemporaryController {
  constructor(private readonly temporaryService: TemporaryService) {}

  @Post()
  create(@Body() createTemporaryDto: CreateTemporaryDto) {
    return this.temporaryService.create(createTemporaryDto);
  }

  @Get()
  findAll() {
    return this.temporaryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.temporaryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTemporaryDto: UpdateTemporaryDto) {
    return this.temporaryService.update(+id, updateTemporaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.temporaryService.remove(+id);
  }
}
