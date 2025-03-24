import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCommentDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: data.userID },
    });

    if (!user) {
      throw new Error('Foydalanuvchi topilmadi!');
    }

    const product = await this.prisma.product.findUnique({
      where: { id: data.productID },
    });

    if (!product) {
      throw new Error('Mahsulot topilmadi!');
    }

    const createdComment = await this.prisma.comment.create({ data });
    return { createdComment };
  }

  async findAll() {
    return this.prisma.comment.findMany({
      include: { user: true, product: true }, // Bog‘langan ma’lumotlarni qo‘shish
    });
  }

  async findOne(userId:string, id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
      include: { user: true, product: true },
    });

    if (!comment) {
      throw new Error('Izoh topilmadi!');
    }

    return comment;
  }

  async update(userId:string, id: number, data: UpdateCommentDto) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new Error('Izoh topilmadi!');
    }

    const updatedComment = await this.prisma.comment.update({
      where: { id },
      data,
    });

    return { updatedComment };
  }

  async remove(userId:string, id: number) {
    const comment = await this.prisma.comment.findUnique({
      where: { id },
    });

    if (!comment) {
      throw new Error('Izoh topilmadi!');
    }

    return this.prisma.comment.delete({
      where: { id },
    });
  }

  async productRating(userId:string, productId:number){
    let findProduct = await this.prisma.comment.findMany({where:{productID:productId}});
    if(!findProduct.length){
      throw new Error('Productga hali comment yozilmagan!');
    }
    return {Comments:findProduct}

  }
}
