import { Module } from '@nestjs/common';
import { AccionCorrectivaService } from './accion-correctiva.service';
import { AccionCorrectivaController } from './accion-correctiva.controller';
import { AccionCorrectiva } from './entities/accion-correctiva.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [AccionCorrectivaController],
  providers: [AccionCorrectivaService],
  imports: [TypeOrmModule.forFeature([AccionCorrectiva])],
})
export class AccionCorrectivaModule {}
