import { Module } from '@nestjs/common';
import { RolService } from './rol.service';
import { RolController } from './rol.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from './entities/rol.entity';

@Module({
  controllers: [RolController],
  providers: [RolService],
  imports: [TypeOrmModule.forFeature([Rol])]
})
export class RolModule {}
function forFeature(arg0: (typeof Rol)[]): import("@nestjs/common").Type<any> | import("@nestjs/common").DynamicModule | Promise<import("@nestjs/common").DynamicModule> | import("@nestjs/common").ForwardReference<any> {
  throw new Error('Function not implemented.');
}

