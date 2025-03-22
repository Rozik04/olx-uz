import { Injectable } from '@nestjs/common';
import { CreateViewingDto } from './dto/create-viewing.dto';
import { UpdateViewingDto } from './dto/update-viewing.dto';

@Injectable()
export class ViewingService {
  create(createViewingDto: CreateViewingDto) {
    return 'This action adds a new viewing';
  }

  findAll() {
    return `This action returns all viewing`;
  }

  findOne(id: number) {
    return `This action returns a #${id} viewing`;
  }

  update(id: number, updateViewingDto: UpdateViewingDto) {
    return `This action updates a #${id} viewing`;
  }

  remove(id: number) {
    return `This action removes a #${id} viewing`;
  }
}
