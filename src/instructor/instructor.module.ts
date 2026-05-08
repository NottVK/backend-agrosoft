import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Instructor } from './entities/instructor.entity';
@Module({
  controllers: [InstructorController],
  providers: [InstructorService],
  imports: [TypeOrmModule.forFeature([Instructor])],
})
export class InstructorModule {}
