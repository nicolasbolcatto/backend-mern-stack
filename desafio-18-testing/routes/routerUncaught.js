import express from "express"
const { Router } = express
import { uncaughtController } from "../controllers/controllerUncaught.js"

const routerUncaught = new Router()

routerUncaught.get("/", uncaughtController)

export { routerUncaught }