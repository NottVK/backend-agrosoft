import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AdministradorModule } from './administrador/administrador.module';
import { EvidenciaModule } from './evidencia/evidencia.module';
import { TratamientoModule } from './tratamiento/tratamiento.module';

@Module({
  imports: [
    // 1. Esto permite leer las variables de tu archivo .env
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // 2. Configuración de conexión a PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.PASSWORD, 
      database: process.env.DATABASE,
      autoLoadEntities: true,
      synchronize: true, 
    }),
    TratamientoModule,
    EvidenciaModule,
    AdministradorModule,
  ],
})
export class AppModule {}