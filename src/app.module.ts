import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionModule } from './region/region.module';
import { TemporaryModule } from './temporary/temporary.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { LikeModule } from './like/like.module';
import { ViewingModule } from './viewing/viewing.module';
import { CommentModule } from './comment/comment.module';
import { OrderModule } from './order/order.module';
import { MessageModule } from './message/message.module';
import { SessionModule } from './session/session.module';
import { BaseDataModule } from './base-data/base-data.module';
import { AuthGuardModule } from './auth-guard/auth-guard.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RegionModule, TemporaryModule, ColorModule, CategoryModule, UserModule, ProductModule, LikeModule, ViewingModule, CommentModule, OrderModule, MessageModule, SessionModule, BaseDataModule, AuthGuardModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
