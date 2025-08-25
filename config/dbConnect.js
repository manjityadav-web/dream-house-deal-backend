import mongoose from 'mongoose'

export const dbConnect = async ()=>{
const Connect = await mongoose.connect('mongodb://localhost:27017/quirex');
if(Connect){
console.log("database connected...");
}

}



