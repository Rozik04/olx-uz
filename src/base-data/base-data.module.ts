import { Module } from '@nestjs/common';
import { BaseDataService } from './base-data.service';
import { BaseDataController } from './base-data.controller';

@Module({
  controllers: [BaseDataController],
  providers: [BaseDataService],
})
export class BaseDataModule {}
