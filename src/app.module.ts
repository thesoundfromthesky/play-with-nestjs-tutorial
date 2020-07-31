import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { MongooseModule } from '@nestjs/mongoose';
import { userModelFactory } from './mongoose';

@Module({
  imports: [CoreModule, MongooseModule.forFeatureAsync([userModelFactory])],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
