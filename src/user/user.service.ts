import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as nodemailer from "nodemailer"
import * as dotenv from "dotenv"
import * as bcrypt from "bcrypt"
import * as fs from "fs"
import * as path from "path"
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
dotenv.config()


@Injectable()
export class UserService { 
  constructor(private prisma: PrismaService, private jwt:JwtService) {}
  async sendOtp(email: any) {
    let newEmail = email.email;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.prisma.temporary.deleteMany({
      where: { email: newEmail },
    });

    await this.prisma.temporary.create({
      data: {
        email: newEmail,
        otp: otp,
      },
    });
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "yusupovruzimuhammad4@gmail.com",
        pass: "kyqo xdzf yvqr gejs",
      },
    });
  
    await transporter.sendMail({
      from: "yusupovruzimuhammad4@gmail.com",
      to: "yusupovruzimuhammad4@gmail.com",
      subject: 'Your OTP Code',
      text: `Your OTP code is: ${otp}`,
    });
  
    return { message: 'OTP sent successfully' }; 
  }

  async verifyOtp(data:any){
  let otp = data.otp;
  let email = data.email;
  let checkOtp = await this.prisma.temporary.findFirst({where:{otp:otp, email:email}});
  console.log(checkOtp);
  
  if(!checkOtp){
    throw new BadRequestException("Something went wrong!");
  }
  
  await this.prisma.temporary.delete({where:{id:checkOtp.id}}); 
  return "Otp verified successfully"
  }
 
  async register(data: CreateUserDto) { 
    let checkUSer = await this.prisma.user.findUnique({where:{email:data.email}});
    if(checkUSer){
      throw new BadRequestException("This email have already been registered!");
    }
    let hash = await bcrypt.hash(data.password, 10);
    let registeredUser = await this.prisma.user.create({
      data:{...data, password: hash}
    })
    return {registeredUser};
  }

  async findAll(userId:string) {
    let data = await this.prisma.user.findMany();
    if(!data.length){
      throw new BadRequestException("Not users found!");
    }
    return {data}
  }

  async login(data:LoginUserDto) {
    let checkUser = await this.prisma.user.findUnique({where:{email:data.email}});
    if(!checkUser){
      throw new BadRequestException("This email doesn't registered yet!");
    }
    let comp = bcrypt.compareSync(data.password,checkUser.password);
    if(!comp){
      throw new BadRequestException("Wrong password!");
    }
    let token = this.jwt.sign({id:checkUser.id, type:checkUser.type})
    return{checkUser, token}
  }

  async update(id: string, data: UpdateUserDto) {
    let checkUser = await this.prisma.user.findUnique({where:{id:Number(id)}});
    if(!checkUser){
      throw new BadRequestException("This user doesn't found!");
    }
    let newHash = '';
    if(data.password){
       newHash = bcrypt.hashSync(data.password, 10);
    }
    let updatedUser = await this.prisma.user.update({where: {id:Number(id)},data: {...data, password: newHash || checkUser.password}
});
   return {updatedUser}
  }

  async remove(id: string) {
    let checkUser = await this.prisma.user.findFirst({where:{id:Number(id)}});
    if(!checkUser){
      throw new BadRequestException("This user doesn't found!");
    }
    if(checkUser.image){
    let image = checkUser.image
    let newIm = path.join(__dirname, '../../uploads', image)
    try {
      await fs.promises.unlink(newIm)
    } catch (error) {
      return ({error})
    }
     let DeletedUSer = await this.prisma.user.delete({where:{id:Number(id)}});
     return {DeletedUSer}
    }
  }

  async updateImage(id:string, image:string){
    let user = await this.prisma.user.findUnique({where:{id:parseInt(id,10)}});
    if(!user?.image){
      return "File not uploaded"
    }
    if(user.image){
    let oldImage = path.join(__dirname,"../../uploads", user.image);
    if(fs.existsSync(oldImage)){
      try {
        await fs.promises.unlink(oldImage)
      } catch (error) {
        return {error}
      }
    }
  }
}

}