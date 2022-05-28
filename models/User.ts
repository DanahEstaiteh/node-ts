import mongoose from 'mongoose'
import { UserDocument } from '../types/IUser'
import bcrypt from 'bcrypt'
const options = {
    discriminatorKey: 'type',
    collection: 'User',
    timestamps: true
}

const schemaUser = new mongoose.Schema<UserDocument>({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    middleName: String,
    lastName: String,
    fullName: String
}, options)




schemaUser.pre('save', function (next) {
    let fullName = [this.firstName, this.middleName, this.lastName]
        .filter(Boolean)
        .join(' ')
    this.fullName = fullName
    console.log("pre save has been called")


    if (this.isNew) {
        this.set({ createdAt: Date.now() })
        this.$locals.isNew = this.isNew
    } else {
        this.set({ updatedAt: Date.now() })
    }

    if (this.isModified('email')) {
        //
    }

    next()
})

schemaUser.pre('save', async function (next) {
    const user = this as UserDocument
    if(!user.isModified('password')){
     next()
    }
    const hash = await bcrypt.hashSync(user?.password,3)
    user.password = hash
    return next()
})

schemaUser.methods.comparePassword = async function (
    candidatePassword: string
  ): Promise<boolean> {
    const user = this as UserDocument;
  
    return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
  };
  

// schemaUser.post('save', function (doc, next) {
//     // send doc to elasticsearch
//     console.log("post save has been called")
//     if (this.$locals.isNew) {
//         //
//     }
//     next()
// })

// schemaUser.pre('remove', function (doc, next) {
//     // send doc to elasticsearch
//     console.log("pre remove has been called")
//     next()
// })

// schemaUser.pre('find', function () {
//     // send doc to elasticsearch
//     this.setQuery({ deleted: false })
//     console.log(this.getQuery())
//     // this.delete = false
//     // next()
// })

// schemaUser.post('find', function (doc, next) {
//     // send doc to elasticsearch
//     console.log("pre find has been called")
//     next()
// })

// schemaUser.pre('updateOne', function () {
//     // send doc to elasticsearch
//     this.set({ updatedAt: Date.now() })
//     console.log("pre updateOne has been called")
//     next()
// })

export default mongoose.model<UserDocument>('User', schemaUser)