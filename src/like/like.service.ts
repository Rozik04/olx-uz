import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLikeDto } from './dto/create-like.dto';

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async likeProduct(userID: number, productID: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productID } });
    if (!product) {
      throw new Error('Product topilmadi!');
    }

    const existingLike = await this.prisma.like.findFirst({
      where: { userID, productID },
    });
    if (existingLike) {
      throw new Error('Bu product allaqachon yoqtirilgan!');
    }

    return  this.prisma.like.create({
      data: { userID, productID },
    });
  }

  async getLikes(productID: number) {
    return this.prisma.like.count({ where: { productID } });
  }

  async unlikeProduct(userID: number, productID: number) {
    const like = await this.prisma.like.findFirst({ where: { userID, productID } });
    if (!like) {
      throw new Error('Yoqtirish topilmadi!');
    }

    return this.prisma.like.delete({ where: { id: like.id } });
  }
}
