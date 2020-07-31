import { Module } from '@nestjs/common';
import { AppConfigModule, mongooseModuleAsyncOptions } from './config';
import { MongooseModule } from "@nestjs/mongoose";

// Let's import mongoosemodule

@Module({
  imports: [AppConfigModule, MongooseModule.forRootAsync(mongooseModuleAsyncOptions)]
})
export class CoreModule { }
