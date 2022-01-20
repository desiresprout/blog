import * as Redis from 'ioredis';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class CacheService {
  constructor(@Inject('connection') private readonly redis: Redis.Redis) {}
}
