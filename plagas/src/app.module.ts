import { Module } from '@nestjs/common';
import { PlagasModule } from './plagas/plagas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { IncidenciaModule } from './incidencia/incidencia.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '5433'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,  
      autoLoadEntities: true,
      synchronize: true,
    }),
    IncidenciaModule,
    PlagasModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
