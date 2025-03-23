import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {
  constructor(private prisma:PrismaService){}
  async create(data: CreateColorDto) {
    let createdData = await this.prisma.color.create({data:{name:data.name}});
    return createdData;
  }

  async findAll() {
    let data = await this.prisma.color.findMany()
    if(!data.length){
      throw new BadRequestException("Not found colors");
    }
    return {data}
  }

  async findOne(id: string) {
    let data = await this.prisma.color.findUnique({where:{id:Number(id)}});
    if(!data){
      throw new BadRequestException("Not found color");
    }
    return {data};
  }

  async update(id: string, data: UpdateColorDto) {
    let checkColor = await this.prisma.color.findUnique({where:{id:Number(id)}});
    if(!checkColor){
      throw new BadRequestException("Not found color");
    }
    let UpdatedData = await this.prisma.color.update({where:{id:Number(id)}, data})
    return {UpdatedData};
  }

  async remove(id: string) {
    let checkColor = await this.prisma.color.findUnique({where:{id:Number(id)}});
    if(!checkColor){
      throw new BadRequestException("Not found color");
    }
    let DeletedData = await this.prisma.color.delete({where:{id:Number(id)}})
    return {DeletedData};
  }
}
