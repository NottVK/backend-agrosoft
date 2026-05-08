import { Module } from '@nestjs/common';
import { PlagasService } from './plagas.service';
import { PlagasController } from './plagas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plagas } from './entities/plagas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plagas])],
  controllers: [PlagasController],
  providers: [PlagasService],
})
export class PlagasModule {}
