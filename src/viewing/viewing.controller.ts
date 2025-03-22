import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewingService } from './viewing.service';
import { CreateViewingDto } from './dto/create-viewing.dto';
import { UpdateViewingDto } from './dto/update-viewing.dto';

@Controller('viewing')
export class ViewingController {
  constructor(private readonly viewingService: ViewingService) {}

  @Post()
  create(@Body() createViewingDto: CreateViewingDto) {
    return this.viewingService.create(createViewingDto);
  }

  @Get()
  findAll() {
    return this.viewingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.viewingService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateViewingDto: UpdateViewingDto) {
    return this.viewingService.update(+id, updateViewingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.viewingService.remove(+id);
  }
}
