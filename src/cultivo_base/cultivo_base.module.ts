import { Module } from '@nestjs/common';
import { CultivoBaseService } from './cultivo_base.service';
import { CultivoBaseController } from './cultivo_base.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultivoBase } from './entities/cultivo_base.entity';

@Module({
  controllers: [CultivoBaseController],
  providers: [CultivoBaseService],
  imports: [
    TypeOrmModule.forFeature([CultivoBase] )
  ]
})
export class CultivoBaseModule {}
