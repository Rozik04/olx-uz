import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerFunc } from 'src/multer';
import { JwtAuthGuard } from 'src/auth-guard/auth.guard';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("upload-image")
  @UseInterceptors(FileInterceptor("image", multerFunc))
  uploadFile(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      return `No file uploaded!`;
    }
    return { file: image.filename };
  }

  @Post()
  create(@Body() data: CreateProductDto) {
    return this.productService.create(data);
  }

  @Get("all")
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch("update-image/:id")
  @UseInterceptors(FileInterceptor("image", multerFunc))
  updateImage(@Body("image") image: string, @Param("id") id: string) {
    return this.productService.updateImage(id, image);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateProductDto) {
    return this.productService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
