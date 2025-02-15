import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: 
        [
            'http://localhost:3000', 
        ],
    credentials: true
}))

export { app };