import { Module } from '@nestjs/common';
import { InsumoModule } from './insumo/insumo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { EnfermedadesModule } from './enfermedades/enfermedades.module';
import { InstructorModule } from './instructor/instructor.module';
import { RolModule } from './rol/rol.module';
import { CosechaModule } from './cosecha/cosecha.module';

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
      synchronize: false,
    }),
    InsumoModule,
    EnfermedadesModule,
    InstructorModule,
    RolModule,
    CosechaModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
