import { Test, TestingModule } from '@nestjs/testing';
import { EvidenciaController } from './evidencia.controller';

describe('EvidenciaController', () => {
  let controller: EvidenciaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EvidenciaController],
    }).compile();

    controller = module.get<EvidenciaController>(EvidenciaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
