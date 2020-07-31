import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
    constructor(private configService: ConfigService) { }

    get baseUrl(): string {
        return this.configService.get("local.baseUrl");
    }

    get port(): string {
        return this.configService.get("local.port");
    }

    get redirect(): string {
        return this.configService.get("local.redirect");
    }
    
    get redisUrl(): string {
        return this.configService.get("redis.url");
    }

    get mongoUri(): string {
        return this.configService.get("mongo.uri");
    }
}
