import { Module } from '@nestjs/common';
import { PlagasService } from './plagas.service';
import { PlagasController } from './plagas.controller';
import { Plagas } from './entities/plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [PlagasController],
  providers: [PlagasService],
  imports: [TypeOrmModule.forFeature([Plagas])],
})
export class PlagasModule {}
