import { Module, DynamicModule, Provider } from '@nestjs/common';
import { CacheService } from './cache.service';
import * as Redis from 'ioredis';
import ConnectionOptions from './cache.interface';

@Module({})
export class CacheModule {
  static forRoot(options: ConnectionOptions): DynamicModule {
    const connectionProvider: Provider = {
      provide: 'connectionToken',
      useValue: new Redis(Number(options.port), options.host),
    };

    return {
      module: CacheModule,
      providers: [connectionProvider, CacheService],
      exports: [CacheService],
    };
  }
}
