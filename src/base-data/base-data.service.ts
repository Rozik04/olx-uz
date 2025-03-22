import { Injectable } from '@nestjs/common';
import { CreateBaseDatumDto } from './dto/create-base-datum.dto';
import { UpdateBaseDatumDto } from './dto/update-base-datum.dto';

@Injectable()
export class BaseDataService {
  create(createBaseDatumDto: CreateBaseDatumDto) {
    return 'This action adds a new baseDatum';
  }

  findAll() {
    return `This action returns all baseData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} baseDatum`;
  }

  update(id: number, updateBaseDatumDto: UpdateBaseDatumDto) {
    return `This action updates a #${id} baseDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} baseDatum`;
  }
}
