import { Module } from '@nestjs/common';
import { VisitanteService } from './visitante.service';
import { VisitanteController } from './visitante.controller';
import { Visitante } from './entities/visitante.entity';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';

@Module({
  controllers: [VisitanteController],
  providers: [VisitanteService],
  imports: [TypeOrmModule.forFeature([Visitante])],
})
export class VisitanteModule {}
