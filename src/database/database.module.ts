import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from './database.config';
import { ConfigType } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
        type: 'postgres',
        ...dbConfig,
        port: parseInt(dbConfig.port, 10),
        synchronize: dbConfig.synchronize === 'true',
        autoLoadEntities: true,
      }),
      inject: [databaseConfig.KEY],
    }),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
