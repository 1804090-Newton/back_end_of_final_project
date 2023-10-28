import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import prodRoute from './routes/products.js'
import authRoute from './routes/auth.js'
import cors from 'cors'

//configuring app
const app = express()
dotenv.config()

//DB pipeline
try {
  mongoose.connect(process.env.MONGO).then(() => {
    console.log('mongo connected')
  })
} catch (error) {
  console.log(error)
}

//middleware
app.use(express.json())

//CORS
app.use(cors({}))

//All routes

app.use('/api/products', prodRoute)
app.use('/api/auth', authRoute)

//Error handling middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500
  const errorMessage = err.message || 'something went wrong'

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack
  })
})

//Server starter
app.listen(8000, () => {
  console.log('back connected')
})
