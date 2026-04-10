import { Module } from '@nestjs/common';
import { InsumoModule } from './insumo/insumo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CultivoRealModule } from './cultivo_real/cultivo_real.module';

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
    CultivoRealModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
