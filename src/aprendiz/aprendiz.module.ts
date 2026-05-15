import { Module } from '@nestjs/common';
import { AprendizService } from './aprendiz.service';
import { AprendizController } from './aprendiz.controller';

@Module({
  controllers: [AprendizController],
  providers: [AprendizService],
})
export class AprendizModule {}