import { Prop, Schema } from '@nestjs/mongoose';
import { CollationOptions } from 'mongoose';

export const userCollation: CollationOptions = { locale: 'en_US', strength: 2 };

// For this schema, I wanted to enable collation. 
// Enabling collation will automatically add collation to query when mongoose sends query to mongodb.//
// Index with collation will be case insenstiive.
// I wanted to include virtuals and getters when toJSON and toObject get called, so they are set to true.
// timestamps will automatically add createdAt and updatedAt field and set times.
@Schema({
  collation: userCollation,
  toJSON: { virtuals: true },
  toObject: { virtuals: true, getters: true },
  timestamps: true,
})
export class User {

  @Prop({ type: String })
  user: string;
}