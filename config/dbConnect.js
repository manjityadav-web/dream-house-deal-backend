import mongoose from 'mongoose'

export const dbConnect = async ()=>{
const Connect = await mongoose.connect('mongodb+srv://manjityadav9986:IAb6vfoPwfJKFYJE@cluster2.g0aglog.mongodb.net/quirex');
if(Connect){
console.log("database connected...");
}

}



