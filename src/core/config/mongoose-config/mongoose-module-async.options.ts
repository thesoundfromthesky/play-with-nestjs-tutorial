import { AppConfigModule } from "../app-config.module";
import { MongooseConfigService } from "./mongoose-config.service";

export const mongooseModuleAsyncOptions = {
  imports: [AppConfigModule],
  useExisting: MongooseConfigService
};