import { Schema } from 'mongoose';
import { UserDocumentQuery, UserQuery } from './user.interfaces';

// Just query helpers
export function userQuery<T extends UserQuery & Document>(
  schema: Schema<T>,
  //   options?: SchemaOptions,
): void {
  schema.query.byId = function(
    this: UserDocumentQuery,
    id: string,
    isDeleted = false,
  ): UserDocumentQuery {
    return this.where('_id')
      .equals(id)
      .where('isDeleted')
      .equals(isDeleted);
  };

  schema.query.byLoginUsername = function(
    this: UserDocumentQuery,
    username: string,
    isDeleted = false,
  ): UserDocumentQuery {
    return this.where('login.username')
      .exists(true)
      .equals(username)
      .where('isDeleted')
      .equals(isDeleted);
  };

  schema.query.byEmailValue = function(
    this: UserDocumentQuery,
    email: string,
    isDeleted = false,
  ) {
    return this.where('emails.value')
      .equals(email)
      .where('isDeleted')
      .equals(isDeleted);
  };
}