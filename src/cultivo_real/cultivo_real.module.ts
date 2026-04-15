import { Module } from '@nestjs/common';
import { CultivoRealService } from './cultivo_real.service';
import { CultivoRealController } from './cultivo_real.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivoReal } from './entities/cultivo_real.entity';

@Module({
  controllers: [CultivoRealController],
  providers: [CultivoRealService],
  imports: [TypeOrmModule.forFeature([CultivoReal])],
})
export class CultivoRealModule {}
