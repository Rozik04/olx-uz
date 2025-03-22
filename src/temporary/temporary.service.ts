import { Injectable } from '@nestjs/common';
import { CreateTemporaryDto } from './dto/create-temporary.dto';
import { UpdateTemporaryDto } from './dto/update-temporary.dto';

@Injectable()
export class TemporaryService {
  create(createTemporaryDto: CreateTemporaryDto) {
    return 'This action adds a new temporary';
  }

  findAll() {
    return `This action returns all temporary`;
  }

  findOne(id: number) {
    return `This action returns a #${id} temporary`;
  }

  update(id: number, updateTemporaryDto: UpdateTemporaryDto) {
    return `This action updates a #${id} temporary`;
  }

  remove(id: number) {
    return `This action removes a #${id} temporary`;
  }
}
