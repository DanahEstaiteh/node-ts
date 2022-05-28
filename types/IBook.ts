import mongoose from "mongoose";
import PaginateModel from "mongoose"
export interface BookInput {
    name: string, 
    ISBN: string;
    author_id: string,
    cover_image: string
}

export interface BookDocument extends BookInput, mongoose.Document {
    createdAt?: Date;
    updatedAt?: Date;
  }