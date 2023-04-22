import express from "express"
const { Router } = express
import { byeController } from "../controllers/controllerBye.js"

const routerBye = new Router()

routerBye.get("/", byeController)

export { routerBye }