import { Prop, Schema } from '@nestjs/mongoose';

// This is a base start of building mongoose schema with NestJS.

// If you'd like to set options for schema, pass options to schema decorator.
// options can be found here
// https://mongoosejs.com/docs/guide.html#options
@Schema()
export class User {

    // If you'd like to set options for schema field, Pass options(Schematypes options) to prop decorator.
    // options can be found here
    // https://mongoosejs.com/docs/schematypes.html#type-key
    @Prop({ type: String })
    user: string;
}