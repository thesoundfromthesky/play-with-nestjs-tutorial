import { CollationOptions, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DateAtPlugin, IsDeletedPlugin } from 'src/mongoose/interfaces';
import { dateAtPlugin, isDeletedPlugin } from 'src/mongoose/plugins';
import { userQuery } from '../user.query';
import {
    getEmailSchema,
    getLoginSchema,
    getNameSchema,
    LoginDocument,
    EmailDocument,
    NameDocument,
  } from '../sub-schemas';
  import { Role } from 'src/mongoose/enums';
  
export const userCollation: CollationOptions = { locale: 'en_US', strength: 2 };

@Schema({
    collation: userCollation,
    toJSON: { virtuals: true },
    toObject: { virtuals: true, getters: true },
    timestamps: true,
})
export class User implements DateAtPlugin, IsDeletedPlugin {
    @Prop({ type: getLoginSchema() })
    login: LoginDocument;

    @Prop({ type: getNameSchema(), required: true })
    name: NameDocument;

    @Prop({ type: [getEmailSchema()] })
    emails: EmailDocument[];

    @Prop({
        type: [String],
        enum: [Role.Admin, Role.User],
        default: Role.User,
    })
    roles: Role[];

    @Prop({ type: String })
    avatar: string;

    @Prop({ type: Map, of: String, default: {} })
    socialMediaHandles: Map<string, string>;

    @Prop({ type: Date, immutable: true })
    createdAt: Date;

    id: string;

    updatedAt: Date;
    createdDate: string;
    createdTime: string;
    updatedDate: string;
    updatedTime: string;

    isDeleted: boolean;
}

// JS class is not hoisted, so we are going to use function to return schema.
export function getUserSchema(): MongooseSchema<User> {

    // NestJS will consume decorator to return schema.
    const userSchema = SchemaFactory.createForClass(User);

    // Miscellounus plugins will be created in seperate files.
    userSchema.plugin(dateAtPlugin);
    userSchema.plugin(isDeletedPlugin);

    // Plugin for mongoose plugin helper, and it will be created in a seperate file.
    userSchema.plugin(userQuery);

    // MongoDB will create binary search tree with index to speed up searching
    // Customize you index
    userSchema.index({ isDeleted: 1 });
    
    // As you can see, It has some options.
    // I wanted to make this index to be unique, caseinsenstivie, and only valid when value exists.
    userSchema.index(
        { 'socialMediaHandles.google': 1 },
        {
            unique: true,
            collation: userCollation,
            partialFilterExpression: {
                'socialMediaHandles.google': { $exists: true },
            },
        },
    );

    // Passing options to prop decorator is not the only way to configure your schema field.
    // We could select path and make options dynamic.
    userSchema.path('login').required(
        function (this /*socialMediaHandles*/) {
            return !(this.socialMediaHandles && this.socialMediaHandles.size);
        } as any,
        'username and password are required to proceed',
    );

    userSchema.path('emails').validate(function (this, emails: []) {
        if (!emails?.length) {
            this.invalidate('emails', 'email is required!');
        }
    });

    return userSchema;
}