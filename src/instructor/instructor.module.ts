import { Module } from '@nestjs/common';
import { InstructorService } from './instructor.service';
import { InstructorController } from './instructor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instructor } from './entities/instructor.entity';
@Module({
  controllers: [InstructorController],
  providers: [InstructorService],
  imports: [TypeOrmModule.forFeature([instructor])]
})
export class InstructorModule {}
function forFeature(arg0: (typeof instructor)[]): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
  throw new Error('Function not implemented.');
}

