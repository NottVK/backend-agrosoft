import { Module } from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { AprendizController } from './aprendiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aprendiz } from './entities/aprendiz.entity';

@Module({
  controllers: [AprendizController],
  providers: [AprendizService],
  imports: [TypeOrmModule.forFeature([Aprendiz])],
})
export class AprendizModule {}
