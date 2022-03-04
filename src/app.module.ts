import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.stage.${process.env.STAGE}`],
    }),
    // TypeOrmModule needs to use forRootAsync for waiting ConfigModule
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [configService.get('DB_ENTITIES_PATH')],
        migrations: [configService.get('DB_MIGRATION_PATH')],
        cli: {
          migrationsDir: 'migration',
        },
      }),
      inject: [ConfigService],
    }),

    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: '192.168.100.5',
    //   port: 5432,
    //   username: 'postgres',
    //   password: 'postgres',
    //   database: 'projectN',
    //   entities: ['dist/**/*.entity.js'],
    //   migrations: ['dist/migration/*.js'],
    //   cli: {
    //     migrationsDir: 'migration',
    //   },
    // }),

    // if ormconfig.json file is setted, there is no need to pass variable to forRoot
    // TypeOrmModule.forRoot({})

    TasksModule,
    AuthModule,
  ],
})
export class AppModule {}
