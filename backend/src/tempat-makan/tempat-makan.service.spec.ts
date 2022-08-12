import { Test, TestingModule } from '@nestjs/testing';
import { TempatMakanService } from './tempat-makan.service';

describe('TempatMakanService', () => {
  let service: TempatMakanService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TempatMakanService],
    }).compile();

    service = module.get<TempatMakanService>(TempatMakanService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
