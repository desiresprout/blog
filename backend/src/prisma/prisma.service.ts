import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import debug from 'debug';

const queryDebug = debug('debug:query');

export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      // datasources:{
      //   db:{
      //     url: ""
      //   }
      // }
      log: [
        { emit: 'stdout', level: 'query' },
        { emit: 'stdout', level: 'info' },
        { emit: 'stdout', level: 'warn' },
        { emit: 'stdout', level: 'error' },
      ],
      errorFormat: 'pretty',
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      const before = Date.now();
      const result = await next(params);
      const after = Date.now();
      const queryLog = `Query ${params.model}.${params.action} took ${after - before}ms`;
      queryDebug('queryLog', queryLog);
      return result;
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
