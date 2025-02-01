// !project dependencies! \\
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'

// !project modules! \\
import register from './routes/register.js'
import login from './routes/login.js'

const app = express()

// !env! \\
dotenv.config()
const dbURL = process.env.URLDB
const port = process.env.PORT || 8000

// !connetion! \\
mongoose.connect(dbURL)
  .then(() => {
    console.log('success to connect database')
    app.listen(port,() => {
      console.log(`server running with port: ${port}`)
    })
  })
  .catch((err) => {
    console.log('error to connect database: ', err)
  })

// !middleware! \\
app.use(express.json())

// !route! \\
app.use('/api', register)
app.use('/api', login)