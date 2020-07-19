import { DocumentQuery, Document } from 'mongoose';
import { User } from './user.schema';

// Type for UserDocument
export interface UserDocument extends User, Omit<Document, 'id'> {}

// Type for UserQuery
export interface UserQuery {
  byId(id: string, isDeleted?: boolean): UserDocumentQuery;
  byLoginUsername(username: string, isDeleted?: boolean): UserDocumentQuery;
  byEmailValue(email: string, isDeleted?: boolean): UserDocumentQuery;
}

// Type for UserDocumentQuery
export interface UserDocumentQuery
  extends DocumentQuery<UserDocument, UserDocument, UserQuery> {}