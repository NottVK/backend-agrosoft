import { Module } from '@nestjs/common';
import { InsumoService } from './insumo.service';
import { InsumoController } from './insumo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Insumo } from './entities/insumo.entity';

@Module({
  controllers: [InsumoController],
  providers: [InsumoService],
  imports: [TypeOrmModule.forFeature([Insumo])],
})
export class InsumoModule {}
