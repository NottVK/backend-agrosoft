import { Module } from '@nestjs/common';
import { InsumoModule } from './insumo/insumo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CultivoRealModule } from './cultivo_real/cultivo_real.module';
import { ActividadEjecutadaModule } from './actividad-ejecutada/actividad-ejecutada.module';
import { AccionCorrectivaModule } from './accion-correctiva/accion-correctiva.module';
import { UsuarioModule } from './usuario/usuario.module';
import { EvidenciaModule } from './evidencia/evidencia.module';
import { AdministradorModule } from './administrador/administrador.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';
import { CosechaModule } from './cosecha/cosecha.module';
import { EnfermedadesModule } from './enfermedades/enfermedades.module';
import { InstructorModule } from './instructor/instructor.module';
import { RolModule } from './rol/rol.module';
<<<<<<< HEAD
import { CoordinadorModule } from './coordinador/coordinador.module';
=======
import { ReporteModule } from './reporte/reporte.module';
import { VentaModule } from './venta/venta.module';
import { VisitanteModule } from './visitante/visitante.module';
>>>>>>> origin/Kevin_Dev

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
    InsumoModule,
    CultivoRealModule,
    ActividadEjecutadaModule,
    AccionCorrectivaModule,
    UsuarioModule,
    EvidenciaModule,
    AdministradorModule,
    TratamientoModule,
    CosechaModule,
    EnfermedadesModule,
    InstructorModule,
    RolModule,
    CoordinadorModule,
    VisitanteModule,
    

  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
