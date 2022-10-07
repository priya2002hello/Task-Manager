
const express=require('express');
const morgan=require('morgan')
const app=express();
const tasks=require('./routes/tasks');
const connectDB=require('./db/connect');
const notfound=require('./middleware/notfound');
const port=process.env.PORT || 3000;
const errorhandler=require('./middleware/errorhandler')

require('dotenv').config();

app.use(express.static('./public'));

app.use(express.urlencoded({extended:false}));//accessing req.body after post request.


app.use(express.json()); //data is converted to json.
//routes
app.use('/api/tasks',tasks);
app.use(notfound);
app.use(errorhandler)
//first connection to database is established and then server spins up
const start=async()=>{
    try {
        await connectDB(process.env.Mongo_URI).then(()=>{
            console.log("connection successful")
        }).catch((err)=>{console.log(err)});
        app.listen(port,()=>{
            console.log(`server is listening on port ${port} `);
            })

    } 
    catch (error) {
        console.log(error);
    }
}
console.log("app started")
start();