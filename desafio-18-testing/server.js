import express from "express"
import session from 'express-session'
import MongoStore from "connect-mongo"
import cookieParser from "cookie-parser"
import passport from "passport"
import { registerStrategy, loginStrategy, serializer, deserializer } from "./utils/passport.js"
import dotenv from "dotenv"
import os from "os"
import cluster from "cluster"
import { fileLogger } from "./log/logger.js"
import { routerProducts } from "./routes/routerProducts.js"
import { routerCarts } from "./routes/routerCarts.js"
import { routerLogin, routerFailLogin } from "./routes/auth/login.js"
import { routerFailRegister, routerRegister } from "./routes/auth/register.js"
import { routerProfile } from "./routes/routerProfile.js"
import { routerConfirm } from "./routes/routerConfirm.js"
import { routerUncaught } from "./routes/routerUncaught.js"
import { routerBase } from "./routes/routerBase.js"
import { routerConfirmSuccess } from "./routes/routerConfirmSuccess.js"
import { routerBye } from "./routes/routerBye.js"


//Get enviroment variables
dotenv.config({
    path: "./keys.env"
})

//Start express app
const app = express()

//Configure app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

//Create session
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_DB,
        mongoOptions: advancedOptions,
        ttl: 300,
        autoRemove: "native"
    }),
    secret: process.env.SESSION_PASSWORD,
    resave: false,
    saveUninitialized: false
}))

//Create template engine
app.set("view engine", "hbs");
app.set("views", "./public/views")

//Indicate static files in public folder
app.use(express.static("./public"))

//AUTH STRATEGIES
app.use(passport.initialize())
app.use(passport.session())

passport.use("register", registerStrategy)
passport.use("login", loginStrategy)
passport.serializeUser(serializer)
passport.deserializeUser(deserializer)

//ROUTES

app.use("/", routerBase)

app.use("/login", routerLogin)

app.use("/fail-login", routerFailLogin)

app.use("/register", routerRegister)

app.use("/fail-register", routerFailRegister)

app.use("/confirm-order", routerConfirm)

app.use("/bye", routerBye)

app.use("/confirm-success", routerConfirmSuccess)

app.use("/profile", routerProfile)
app.use("/api/products", routerProducts)
app.use("/api/carts", routerCarts)

app.use("*", routerUncaught)

//-------------------------------------------------------------------------

//Select mode FORK or CLUSTER and run server

const PORT = process.env.PORT || 8080
const MODE = "FORK"

if (MODE == "FORK" || undefined) {
    //Start listening to server in FORK mode
    app.listen(PORT, () => {
        console.log(`Server listening in port ${PORT} in mode ${MODE}`)
    })

    //Indicate error if server fails
    app.on("error", error => console.log(`Error on server: ${error}`))

} else if (MODE == "CLUSTER") {

    const numCPUs = os.cpus().length
    if (cluster.isPrimary) {

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }

        cluster.on("exit", worker => {
            console.log(`Worker ${worker.process.pid} died: ${new Date().toLocaleString()}`)
            cluster.fork
        })
    } else {

        //Start listening to server in CLUSTER mode

        app.listen(PORT, () => {
            console.log(`Server listening in port ${PORT} in mode ${MODE}`)
        })

        //Indicate error if server fails
        app.on("error", error => {

            fileLogger.warn(`Server error: ${error}`)
            console.log(`Error on server: ${error}`)

        })
    }
}