import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'

const PORT = process.env.PORT || 3000

const app = express()

await connectCloudinary() 

// Middlewares
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


app.use(requireAuth())
app.use('/api/ai',aiRouter)
app.use('/api/user',userRouter)

app.listen(PORT, () => {
    console.log(`Server Running on PORT: ${PORT}`);

})