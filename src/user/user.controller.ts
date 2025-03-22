import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { FileInterceptor, MulterModule } from '@nestjs/platform-express';
import { multerFunc } from 'src/multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post("send-otp")
  sendOtp(@Body() email:string){
    return this.userService.sendOtp(email)
  }

  @Post("verify-otp")
  verifyOtp(@Body() email:string, otp:string){
    return this.userService.verifyOtp(email, otp)
  }

  @Post("upload-image")
  @UseInterceptors(FileInterceptor("image", multerFunc))
  uploadFile(@UploadedFile() image: Express.Multer.File){
    if(!image){
      return `Not file uploaded!`
    }
    return {file: image.filename}
  }
  

  @Post("register")
  register(@Body() data: CreateUserDto) {
    return this.userService.register(data);
  }

  @Get("all")
  findAll() {
    return this.userService.findAll();
  }


  @Patch("update-image/:id")
  @UseInterceptors(FileInterceptor("image",multerFunc))
  updateImage(@Body("image") image:string, @Param("id") id: string){
    return this.userService.updateImage(id,image);
  }

  @Post('login')
  login(@Body() data: LoginUserDto) {
    return this.userService.login(data);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
