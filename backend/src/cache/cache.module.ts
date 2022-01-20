import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CacheService } from './cache.service';
import { SessionService } from './session.service';
import * as Redis from 'ioredis';
import ConnectionOptions from './cache.interface';

@Module({})
export class CacheModule {
  static forRoot(options: ConnectionOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: 'connection',
      useValue: new Redis(Number(options.port), options.host),
    };

    return {
      module: CacheModule,
      providers: [connectionProvider, CacheService, SessionService],
      exports: [CacheService, SessionService],
    };
  }
}
