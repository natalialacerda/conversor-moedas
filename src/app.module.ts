import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionsModule } from './conversions/conversions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'currency_converter',
      autoLoadEntities: true,
      synchronize: true,
    }),

    ConversionsModule,
  ],
})
export class AppModule {}