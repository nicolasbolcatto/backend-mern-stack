import express from "express"
const { Router } = express
import { baseController } from "../controllers/controllerBase.js"

const routerBase = new Router()

routerBase.get("/", baseController)

export { routerBase }