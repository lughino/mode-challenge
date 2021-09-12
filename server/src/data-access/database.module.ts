import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import path from 'path';

const providers = [
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: path.join(__dirname, '..', '..', 'db', 'modo.sql'),
    entities: [`${__dirname}/../**/*.entity{.ts,.js}`],
    synchronize: true,
  }),
];

@Module({
  imports: [...providers],
  exports: [...providers],
})
export class DatabaseModule {}
