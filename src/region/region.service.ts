import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateRegionDto) {
    let checkRegion = await this.prisma.region.findUnique({ where: { name: data.name } });

    if (checkRegion) {
      throw new BadRequestException(`Region with name "${data.name}" already exists!`);
    }

    let newRegion = await this.prisma.region.create({
      data,
    });

    return { newRegion };
  }

  async findAll() {
    let data = await this.prisma.region.findMany();
    if (!data.length) {
      throw new BadRequestException("No regions found.");
    }
    return { data };
  }

  async findOne(id: string) {
    let region = await this.prisma.region.findUnique({ where: { id: Number(id) } });
    if (!region) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }
    return { region };
  }

  async update(id: string, data: UpdateRegionDto) {
    let checkRegion = await this.prisma.region.findUnique({ where: { id: Number(id) } });
    if (!checkRegion) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    let updatedRegion = await this.prisma.region.update({
      where: { id: Number(id) },
      data,
    });

    return { updatedRegion };
  }

  async remove(id: string) {
    let checkRegion = await this.prisma.region.findUnique({ where: { id: Number(id) } });
    if (!checkRegion) {
      throw new NotFoundException(`Region with ID ${id} not found`);
    }

    let deletedRegion = await this.prisma.region.delete({ where: { id: Number(id) } });
    return { deletedRegion };
  }
}
