import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

const providers = [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: path.join(__dirname, '..', '..', 'db', 'mode.db'),
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    // TODO: in realworld scenario, we should use migrations and handle these configs through an env variables
    synchronize: true,
  }),
];

@Module({
  imports: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
