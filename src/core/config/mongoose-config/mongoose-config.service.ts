import { Injectable } from '@nestjs/common';
import {
    MongooseOptionsFactory,
    MongooseModuleOptions,
  } from '@nestjs/mongoose';
  import { AppConfigService } from '../app-config.service';
  import * as virtuals from 'mongoose-lean-virtuals';
  import * as getters from 'mongoose-lean-getters';
  import * as defaults from 'mongoose-lean-defaults';
  import { Mongoose } from 'mongoose';

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private readonly appConfigService: AppConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {

    // This where we config mongoose
    return {
      uri: this.appConfigService.mongoUri,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      // ,autoCreate: true
      // ,autoIndex:false
      connectionFactory: (connection: Mongoose): Mongoose => {
        connection.plugin(virtuals);
        connection.plugin(getters);
        connection.plugin(defaults);

        return connection;
      },
    };
  }
}