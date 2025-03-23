import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
imports: [PrismaModule, JwtModule.register({global:true, secret:"mysecret", signOptions:{expiresIn:"2h"}})],
controllers: [ProductController],
providers: [ProductService],
})
export class ProductModule {}
