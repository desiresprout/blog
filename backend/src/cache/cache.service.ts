import { Injectable, Inject } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as Redis from 'ioredis';

@Injectable()
export class CacheService {
  constructor(@Inject('connection') private readonly redis: Redis.Redis) {}

  async setSession(email: string) {
    return this.redis.hset(email, dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'), '2');
  }

  async getSession(email: string) {
    return this.redis.hget(email, '2022-01-19 15:04:45');
  }

  async clearSession(email: string) {
    return this.redis.hdel(email);
  }
}
