import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
// We will work on this file on a seperate file
import { configModuleOptions } from './config-module-options';
import { AppConfigService } from './app-config.service';
import { MongooseConfigService } from './mongoose-config/mongoose-config.service';
// Starting from where we left off

// Make new branch from development branch with following command
// git checkout -b feature-core-config

// install following dependency
// npm i --save @nestjs/config
// Config module will let us use dotenv internally

// Create core folder.
// Create config folder inside core folder
// Generate app-config module with following command
// nest g mo core/config/app-config --flat

const apiConfigProviders = [
    AppConfigService,
    MongooseConfigService
];

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions)],
    exports: [...apiConfigProviders],
    providers: [...apiConfigProviders]
})
export class AppConfigModule { }
