import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma : PrismaService){}
  
  async create(data: CreateCategoryDto) {
    let checkCategory = await this.prisma.category.findUnique({where: { name: data.name }});
  
    if (checkCategory) {
      throw new BadRequestException(`Category with name "${data.name}" already exists!`);
    }
  
    let newCategory = await this.prisma.category.create({
      data,
    });
  
    return { newCategory };
  }

  async findAll() {
    let data = await this.prisma.category.findMany()
    if(!data.length){
      throw new BadRequestException("Not found categories");
    }
    return {data};
  }

  async findOne(id: string) {
    let category = await this.prisma.category.findUnique({where: {id:Number(id) }});
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    } 
    return { category };
  }

  async update(id: string, data: UpdateCategoryDto) {
    let checkCategory = await this.prisma.category.findUnique({where:{id:Number(id)}})
    if(!checkCategory){
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    let updatedData = await this.prisma.category.update({where:{id:Number(id)}, data});
    return {updatedData}
  }

  async remove(id: string) {
    let checkCategory = await this.prisma.category.findUnique({where:{id:Number(id)}})
    if(!checkCategory){
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    let DeletedCategory = await this.prisma.category.delete({where:{id:Number(id)}})
    return {DeletedCategory}
  }
}
