import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject('connectionToken') private readonly redis) {}
}
