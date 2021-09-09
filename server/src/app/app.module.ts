import { Module } from '@nestjs/common';
import { DatabaseModule } from '../data-access';

@Module({
  imports: [DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
