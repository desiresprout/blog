import { Injectable, Inject } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as Redis from 'ioredis';

@Injectable()
export class SessionService {
  constructor(@Inject('connection') private readonly redis: Redis.Redis) {}

  async setSession(email: string, deviceID: string) {
    return this.redis.hset(
      email,
      deviceID,
      JSON.stringify({ loginDate: dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss') })
    );
  }

  async getSession(email: string) {
    return this.redis.hget(email, '2022-01-19 15:04:45');
  }

  async clearSession(key: string, fieldKey: string) {
    return this.redis.hdel(key, fieldKey);
  }
}
