import { ConfigModuleOptions } from "@nestjs/config/dist/interfaces";
import * as Joi from "@hapi/joi";

// We will work on this on a seperate file
// load will register environment variables in .env to nestjs app
import { load } from "./load";

// Install following dependency
// npm install --save @hapi/joi
// npm install --save-dev @types/hapi__joi

// Set up validationSchema with Joi
const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production", "test", "provision")
        .default("development"),
    PORT: Joi.number().default(8000),
    REDIRECT: Joi.string().required(),
    BASE_URL: Joi.string().required(),
    MONGO_URI: Joi.string().required(),
});

// You can change validation options here
const validationOptions = {
    allowUnknown: false,
    abortEarly: true
};

// export config options
export const configModuleOptions: ConfigModuleOptions = {
    load,
    validationSchema,
    // validationOptions
    //, isGlobal: true,
    // envFilePath: [".development.env"],
    // ignoreEnvFile: true,
    expandVariables: true
};