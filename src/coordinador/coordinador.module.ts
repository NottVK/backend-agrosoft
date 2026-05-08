import { Module } from '@nestjs/common';
import { CoordinadorService } from './coordinador.service';
import { CoordinadorController } from './coordinador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coordinador } from './entities/coordinador.entity';

@Module({
  controllers: [CoordinadorController],
  providers: [CoordinadorService],
  imports: [TypeOrmModule.forFeature([Coordinador])],
})
export class CoordinadorModule {}
