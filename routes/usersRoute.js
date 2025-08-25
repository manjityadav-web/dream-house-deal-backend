
import express from 'express'
import { propertyModel, usersModel } from '../model/table.js'
import { buyerModel } from '../model/table.js';

const router = express.Router();


router.post('/user-register', async (req, res) => {

    try {
        const { name, email, password, contact, address } = req.body;
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

        const isExist = await usersModel.findOne({ email });

        if (isExist) {
            res.json({
                code: 400,
                message: "User Already Exist.",
                data: isExist
            })
        }
        else {
            const data = new usersModel({ name, email, password, contact, address, profile: profile?.name })
            const result = await data.save();

            res.json({
                code: 200,
                message: "Registration Successfully..",
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

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const isLogin = await usersModel.findOne({ email, password });

        if (isLogin) {
            res.json({
                code: 200,
                message: "Login Successfully",
                data: isLogin

            })

        }
        else {
            res.json({
                code: 400,
                message: "User Not Found",
                data: ""
            })
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


router.post('/buy', async (req, res) => {

    try {


      
        const { userId, propertyId } = req.body;
        const isSold = await buyerModel.findOne({ propertyId })
              
        if(!userId||!propertyId){
             return res.json({
                code: 400,
                message: "You must be login to buy a property",
                data: '' 
            })

        }

        if (isSold) {
            res.json({
                code: 400,
                message: "Property already sold..",
                data: isSold
            })
        }
        else {

            const data = new buyerModel({ userId, propertyId });
            const result = await data.save();

            res.json({
                code: 200,
                message: "Property bought successfully...",
                data: result
            })

        }

    }
    catch (error) {

        res.json({
            code: 500,
            message: "Internal Server Error",
            data: '',
            err: err.message
        })

    }

})

router.post('/user-bought-list', async (req, res) => {
    try {

        const { userId } = req.body
       const rawData = await buyerModel.find({ userId });
        const finalData = await Promise.all(
            rawData.map (async(item) => {

                const propertyData = await propertyModel.findOne({ _id: item?.propertyId });

                return {
                    _id: item?._id,
                    propertyId: propertyData?._id,
                    title: propertyData?.title,
                    price: propertyData?.price,
                    area: propertyData?.area,
                    location: propertyData?.location,
                    description: propertyData?.description,
                    pic: propertyData?.pic  
                    
                }
                

               
            }
        
            
        ))

             res.json({
                    code:200,
                    message:'Data fetched successfully..',
                    data:finalData
                })

        }
    
    catch (error) {
        res.json({
            code: 500,
            message: 'Internal server Error',
            data: ''

        })
    }
})


router.put('/user-update',async(req,res)=>{

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


export default router;