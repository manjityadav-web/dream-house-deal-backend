import mongoose from 'mongoose';
// import Property from '../../frontend/src/components/landingComponents/Property'; 

const userSchema = new mongoose.Schema({
    name:{type:String,},
    email:{type:String},
    password:{type:String},
    contact:{type:String},
    address:{type:String},
    profile:{type:String},
    userType:{type:String, default:'user'},
    createdAt:{type:Date, default:Date.now()},
    updateAt:{type:Date, default:Date.now()},
})

export const usersModel = mongoose.model('users',userSchema);

const addProperty = new mongoose.Schema({
    bedroom:{type:String},
    bathroom:{type:String},
    title:{type:String},
    price:{type:String},
    area:{type:String},
    location:{type:String},
    description:{type:String},
    pic:{type:String},
    createdAt:{type:Date, default:Date.now()},
    updateAt:{type:Date, default:Date.now()},
})

export const propertyModel = mongoose.model('properties', addProperty);


const buyerSchema = new mongoose.Schema({
    userId:{type:String},
    propertyId:{type:String},
     createdAt:{type:Date, default:Date.now()},
    updateAt:{type:Date, default:Date.now},
})

export const buyerModel= mongoose.model('buyers',buyerSchema)


const contactSchema = new mongoose.Schema({
    name:{type:String,},
    email:{type:String},
    subject:{type:String},
    message:{type:String},
    contact:{type:String},
     createdAt:{type:Date, default:Date.now()},
     updateAt:{type:Date, default:Date.now()},
})

export const contactModel= mongoose.model('contact',contactSchema)





