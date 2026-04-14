import { Module } from '@nestjs/common';
import { CosechaService } from './cosecha.service';
import { CosechaController } from './cosecha.controller';
import { Cosecha } from './entities/cosecha.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CosechaController],
  providers: [CosechaService],
   imports: [TypeOrmModule.forFeature([Cosecha])]
})
export class CosechaModule {}
