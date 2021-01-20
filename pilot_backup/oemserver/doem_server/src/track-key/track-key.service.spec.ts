import { Test, TestingModule } from '@nestjs/testing';
import { TrackKeyService } from './track-key.service';

describe('TrackKeyService', () => {
  let service: TrackKeyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrackKeyService],
    }).compile();

    service = module.get<TrackKeyService>(TrackKeyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
