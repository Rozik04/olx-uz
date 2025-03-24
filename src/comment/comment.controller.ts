import { Controller,Get,Post,Body,Patch,Param,Delete,Request, UseGuards} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth-guard/auth.guard';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Request() req, @Param('id') id: string) {
    let userId = req.user.id;
    return this.commentService.findOne(userId, Number(id));
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(
    @Request() req,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    let userId = req.user.id;
    return this.commentService.update(userId, Number(id), updateCommentDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Request() req, @Param('id') id: string) {
    let userId = req.user.id;
    return this.commentService.remove(userId, Number(id));
  }

  @Get("of/:id")
  @UseGuards(JwtAuthGuard)
  productRating(@Param("productId") productId:number, @Request() req){
    let userId = req.user.id;
    return this.commentService.productRating(userId, productId)
  }
}
