import mongoose from "mongoose";
export interface UserInput {
    email: string, 
    password: string;
    firstName: string,
    middleName?: string,
    lastName: string,
    fullName?: string,
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt?: Date;
    updatedAt?: Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
  }