import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin:"*",
    credentials: true
}))

app.use(express.json({limit: "50mb"}))
app.use(express.urlencoded({extended: true, limit: "50mb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRoute from './routes/useRoute.js'
import otpRoute from "./routes/emailRoute.js"
import facultyRoute from "./routes/facultyRoute.js"
import departmentRoute from './routes/departmentRoute.js'
import subjectRoute from './routes/subjectRoute.js'

app.use("/api/v1/user",userRoute)
app.use('/api/v1/otp', otpRoute)
app.use('/api/v1/facutly', facultyRoute)
app.use('/api/v1/department', departmentRoute)
app.use('/api/v1/subjects', subjectRoute)

export { app };