import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BaseDataService } from './base-data.service';
import { CreateBaseDatumDto } from './dto/create-base-datum.dto';
import { UpdateBaseDatumDto } from './dto/update-base-datum.dto';

@Controller('base-data')
export class BaseDataController {
  constructor(private readonly baseDataService: BaseDataService) {}

  @Post()
  create(@Body() createBaseDatumDto: CreateBaseDatumDto) {
    return this.baseDataService.create(createBaseDatumDto);
  }

  @Get()
  findAll() {
    return this.baseDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.baseDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBaseDatumDto: UpdateBaseDatumDto) {
    return this.baseDataService.update(+id, updateBaseDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.baseDataService.remove(+id);
  }
}
