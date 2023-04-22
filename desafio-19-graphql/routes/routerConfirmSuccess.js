import express from "express"
const { Router } = express
import { controllerConfirmSuccess } from "../controllers/controllerConfirmSuccess.js"

const routerConfirmSuccess = new Router()

routerConfirmSuccess.get("/", controllerConfirmSuccess)

export { routerConfirmSuccess }