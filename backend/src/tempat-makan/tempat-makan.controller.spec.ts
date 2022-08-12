import { Test, TestingModule } from '@nestjs/testing';
import { TempatMakanController } from './tempat-makan.controller';

describe('TempatMakanController', () => {
  let controller: TempatMakanController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TempatMakanController],
    }).compile();

    controller = module.get<TempatMakanController>(TempatMakanController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
