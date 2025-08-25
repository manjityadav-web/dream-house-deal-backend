import express from 'express'
import { buyerModel, propertyModel, usersModel, contactModel } from '../model/table.js'

const adminRoute = express.Router();

adminRoute.post('/add-property', async (req, res) => {          
    try {
        const { title, price, area, description, location, bedroom, bathroom } = req.body;
        const { pic } = req.files;
        pic.mv("Uploads/" + pic?.name, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    message: "Error in File Upload.",
                    data: ''
                })
            }
        })
        const isExist = await propertyModel.findOne({ title });
        if (isExist) {
            res.json({
                code: 400,
                message: "Property Already Exist.",
                data: isExist
            })
        } else {

            const data = new propertyModel({ title, price, area, description, location, bedroom, bathroom, pic: pic?.name })
            const result = await data.save();
            res.json({
                code: 200,
                message: "Property Added Successfully..",
                data: result
            })
        }
console.log(req.body);


    } catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: ''
        })
    }


})



adminRoute.get('/property-list', async (req, res) => {

    try {

        const response = await propertyModel.find();
        if (response?.length > 0) {
            res.json({
                code: 200,
                message: "Property fetch Successfully..",
                data: [response]

            })

          
            
        }
        else {
            res.json({
                code: 400,
                message: "Data Not Found",
                data: []
            })
        }
    }

    catch (error) {
        res.json({
            code: 500,
            message: "Internal Server Error..",
            data: []
        })
    }

})

adminRoute.get('/admin-sold-property', async (req, res) => {
    try {

        const rawData = await buyerModel.find()

        const finalData = await Promise.all(
            rawData.map(async (item) => {

                const propertyData = await propertyModel.findOne({ _id: item?.propertyId });
                const userData = await usersModel.findOne({ _id: item?.userId });


                return {
                    _id: item?._id,
                    propertyId: propertyData?._id,
                    title: propertyData?.title,
                    price: propertyData?.price,
                    area: propertyData?.area,
                    location: propertyData?.location,
                    description: propertyData?.description,
                    pic: propertyData?.pic,
                    name: userData?.name,
                    email: userData?.email,
                    contact: userData?.contact,

                }

            }


            ))
        res.json({
            code: 200,
            message: 'Data fetched successfully..',
            data: finalData
        })

    }

    catch (error) {
        res.json({
            code: 500,
            message:'Internal Server Error.',
            data: ''

        })
    }
})

adminRoute.put('/admin-update',async(req,res)=>{

          try{
              const { name, email, password, contact, address ,userId} = req.body;
            const { profile } = req.files;

             profile.mv("Uploads/" + profile?.name, (err) => {
            if (err) {
                res.json({
                    code: 400,
                    message: "Error in File Upload",
                    data: ''
                })
            }
        }
        )

        
       const result =  await usersModel.findByIdAndUpdate({_id:userId},{name,email,password,contact,address,profile:profile?.name},{new:true})

       if(result){
        res.json({
            code:200,
            message:"User Updated successfully..",
            data:result
        })
       }
       else{
         res.json({
            code:400,
            message:"User Updated Failed",
            data:''
        })
       }
          }catch(error){
            res.json({

                code:500,
                message:error.message,
                data:''

            })
          }
})

// adminRoute.post('/delete-property', async(req,res)=>{

  
//     try {
        
//           const {_id} = req.body;
//             const result = await propertyModel.findByIdAndDelete({_id});
           
            
//           if(result){
//             res.json({
//             code: 200,
//             message: "Property Deleted Successfully",
//             data: ''
//         })
//           }
//           else{
//             res.json({
//             code: 400,
//             message: "Property Delete failed",
//             data: ''
//         })
//           }
//         }
//     catch (err) {
//         res.json({
//             code: 500,
//             message: err.message,
//             data: ''
//         })
//     }

// })

adminRoute.get('/admin-user-list', async (req, res) => {
    try {
        const result = await usersModel.find({userType:"user"});
        if (result?.length > 0) {
            res.json({
                code: 200,
                message: "Data fetched successfully..",
                data: result
            })
        } else {
            res.json({
                code: 400,
                message: "Data Not Found.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 500,
            message: error.message,
            data: []
        })
    }
})



adminRoute.post('/send-contact', async (req, res) => {

    try {
        const { name, email,  contact, subject,message } = req.body;
       
       
    
        const isExist = await contactModel.findOne({ email });

        if (isExist) {
            res.json({
                code: 400,
                message: "User Already Exist.",
                data: isExist
            })
        }
        else {
            const data = new contactModel({ name, email, contact, subject,message })
            const result = await data.save();

            res.json({
                code: 200,
                message: "Message Sent Successfully.",
                data: result
            });

        }
    }
    catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error",
            data: '',
            err: err.message
        })
    }

})

adminRoute.get('/contact-list', async (req, res) => {
    try {
        const result = await contactModel.find();
        if (result?.length > 0) {
            res.json({
                code: 200,
                message: "Data fetched successfully..",
                data: result
            })
        } else {
            res.json({
                code: 400,
                message: "Data Not Found.",
                data: []
            })
        }
    } catch (error) {
        res.json({
            code: 500,
            message: error.message,
            data: []
        })
    }
})

adminRoute.post('/delete-contact', async(req,res)=>{

  
    try {
        
          const {email} = req.body;
            const result = await contactModel.findOneAndDelete({email});
           
            
          if(result){
            res.json({
            code: 200,
            message: "Contact Deleted Successfully",
            data: ''
        })
          }
          else{
            res.json({
            code: 400,
            message: "contact Delete failed",
            data: ''
        })
          }
        }
    catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: ''
        })
    }

})

adminRoute.post('/delete-sold-property', async(req,res)=>{

  
    try {
        
          const {_id} = req.body;
       
            const result = await buyerModel.findByIdAndDelete({_id});
           

            
          if(result){
            res.json({
            code: 200,
            message: "Property Deleted Successfully",
            data: ''
        })
          }
          else{
            res.json({
            code: 400,
            message: "Property Delete failed",
            data: ''
        })
          }
        }
    catch (err) {
        res.json({
            code: 500,
            message: "Internal Server Error.",
            data: ''
        })
    }

})








export default adminRoute;
