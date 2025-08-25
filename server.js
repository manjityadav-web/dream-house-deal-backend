import express from 'express'
import { dbConnect } from './config/dbConnect.js';
import { usersModel } from './model/table.js';
import router from './routes/usersRoute.js'
import adminRoute from './routes/adminRoute.js'
import fileUpload from 'express-fileupload';
import cors from 'cors';


const app = express();
app.use(express.json());
app.use(fileUpload());
app.use(cors(
    {
        origin: 'https://dream-house-deal-frontend.vercel.app',
        credentials: true
    }
));


dbConnect();

app.use('/img',express.static('uploads'))
app.use('/api',router);
app.use('/api',adminRoute);


app.listen(5500,()=>{
    console.log("server running..");
    
})