import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateOrderDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: data.productID },
    });
  
    if (!product) {
      throw new Error('Mahsulot topilmadi!');
    }
  
    const avail = product.available ?? 0;

    if (avail < data.countOfProduct) {
      throw new Error(
        `Buyurtma qabul qilinmadi! Omborda faqat ${product.available} dona mavjud.`
      );
    }
  
    await this.prisma.product.update({
      where: { id: data.productID },
      data: { available: avail - data.countOfProduct },
    });
  
    let total = product.price * data.countOfProduct;
    let createdData = await this.prisma.order.create({data:{ ...data, totalPrice:total }});
    return {createdData}
  }

  async findAll() {
    return this.prisma.order.findMany();
  }

  async findOne(userId: string, id: string) {
    return this.prisma.order.findUnique({
      where: { id: Number(id) },
    });
  }

  async update(userId:string, id: string, data: UpdateOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: Number(id) },
    });
  
    if (!order) {
      throw new Error('Buyurtma topilmadi!');
    }
  
    const product = await this.prisma.product.findUnique({
      where: { id: order.productID },
    });
  
    if (!product) {
      throw new Error('Mahsulot topilmadi!');
    }
  
    const avail = product.available ?? 0;
    const oldCount = order.countOfProduct;
    const newCount = data.countOfProduct;
    const difference = newCount! - oldCount;
  
    if (difference > 0 && avail < difference) {
      throw new Error(
        `Yangilash imkonsiz! Omborda faqat ${avail} dona mavjud.`
      );
    }
  
    await this.prisma.product.update({
      where: { id: order.productID },
      data: { available: avail - difference },
    });
  
    const total = product.price * newCount!;
  
    const updatedOrder = await this.prisma.order.update({
      where: { id: Number(id) },
      data: { ...data, totalPrice: total },
    });
  
    return { updatedOrder };
  }
  
  async remove(userId: string, id: string) {
    return this.prisma.order.delete({
      where: { id: Number(id) },
    });
  }
}
