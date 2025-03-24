import { Controller, Get, Post, Param, Delete, Request, UseGuards, Body } from '@nestjs/common';
import { LikeService } from './like.service';
import { JwtAuthGuard } from 'src/auth-guard/auth.guard';
import { CreateLikeDto } from './dto/create-like.dto';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
likeProduct(@Request() req, @Body() data: CreateLikeDto) {
    let userId = req.user.id;
    return this.likeService.likeProduct(userId, data.productID);
  }

  @Get(':productId')
 getLikes(@Param('productId') productId: string) {
    return this.likeService.getLikes(Number(productId));
  }

  @Delete(':productId')
  @UseGuards(JwtAuthGuard)
 unlikeProduct(@Request() req, @Param('productId') productId: string) {
    let userId = req.user.id;
    return this.likeService.unlikeProduct(userId, Number(productId));
  }
}