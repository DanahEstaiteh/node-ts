import mongoose from "mongoose";
import PaginateModel from "mongoose"
import { ObjectId } from "mongoose";
export interface BookInput {
    name: string, 
    ISBN: string;
    author_id: ObjectId,
    cover_image: string
}

export interface BookDocument extends BookInput, mongoose.Document {
    createdAt?: Date;
    updatedAt?: Date;
  }