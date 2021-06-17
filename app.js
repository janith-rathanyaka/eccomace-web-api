const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors())
app.options('*',cors())




//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));


//Router
const productRouter = require('./routers/products')
const categoryRouter = require('./routers/categories')
const orderRouter = require('./routers/orders')
const userRouter = require('./routers/users')

const api = process.env.API_URL;

app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/products`, productRouter);
app.use(`${api}/users`, userRouter);
app.use(`${api}/orders`, orderRouter);







mongoose.connect(process.env.CONNECTION_STRING,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=>{
   console.log(err)
})

app.listen(5000,()=>{
    console.log('server start')
})