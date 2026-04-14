import { Module } from '@nestjs/common';
import { EnfermedadesService } from './enfermedades.service'
import { EnfermedadesController } from './enfermedades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enfermedade } from './entities/enfermedade.entity';

@Module({
  controllers: [EnfermedadesController],
  providers: [EnfermedadesService],
  imports: [TypeOrmModule.forFeature([Enfermedade])]
})
export class EnfermedadesModule {}
function forFeature(arg0: (typeof Enfermedade)[]): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
  throw new Error('Function not implemented.');
}

