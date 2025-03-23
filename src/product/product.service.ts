import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as fs from "fs";
import * as path from "path";

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateProductDto) {
    return await this.prisma.product.create({ data });
  }

  async findAll() {
    let data = await this.prisma.product.findMany();
    if (!data.length) {
      throw new BadRequestException("No products found!");
    }
    return { data };
  }

  async findOne(id: string) {
    let product = await this.prisma.product.findUnique({ where: { id: Number(id) } });
    if (!product) {
      throw new BadRequestException("Product not found!");
    }
    return { product };
  }

  async update(id: string, data: UpdateProductDto) {
    let checkProduct = await this.prisma.product.findUnique({ where: { id: Number(id) } });
    if (!checkProduct) {
      throw new BadRequestException("Product not found!");
    }
    let updatedProduct = await this.prisma.product.update({
      where: { id: Number(id) },
      data,
    });
    return { updatedProduct };
  }

  async remove(id: string) {
    let checkProduct = await this.prisma.product.findUnique({ where: { id: Number(id) } });
    if (!checkProduct) {
      throw new BadRequestException("Product not found!");
    }
    if (checkProduct.image) {
      let imagePath = path.join(__dirname, '../../uploads', checkProduct.image);
      try {
        await fs.promises.unlink(imagePath);
      } catch (error) {
        return { error };
      }
    }
    let deletedProduct = await this.prisma.product.delete({ where: { id: Number(id) } });
    return { deletedProduct };
  }

  async updateImage(id: string, image: string) {
    let product = await this.prisma.product.findUnique({ where: { id: parseInt(id, 10) } });
    if (!product) {
      throw new BadRequestException("Product not found!");
    }
    if (product.image) {
      let oldImage = path.join(__dirname, '../../uploads', product.image);
      if (fs.existsSync(oldImage)) {
        try {
          await fs.promises.unlink(oldImage);
        } catch (error) {
          return { error };
        }
      }
    }
    let updatedProduct = await this.prisma.product.update({
      where: { id: parseInt(id, 10) },
      data: { image },
    });
    return { updatedProduct };
  }
}
