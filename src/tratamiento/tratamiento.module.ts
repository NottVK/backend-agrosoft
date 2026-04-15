import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TratamientoService } from './tratamiento.service';
import { TratamientoController } from './tratamiento.controller';
import { Tratamiento } from './entities/tratamiento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tratamiento])], // Importante para inyectar el repositorio
  controllers: [TratamientoController],
  providers: [TratamientoService],
})
export class TratamientoModule {}