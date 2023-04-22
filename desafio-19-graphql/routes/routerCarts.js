import express from "express"
import { requireAuthentication } from "../controllers/auth/controllerRequireAuth.js"
import { controllerGetProductsInCart, controllerAddProductToCart, controllerDeleteProductFromCart } from "../controllers/controllerCarts.js"

const { Router } = express
const routerCarts = Router()
routerCarts.get("/:id/products", requireAuthentication, controllerGetProductsInCart)
routerCarts.post("/:id/products/:id_prod", requireAuthentication, controllerAddProductToCart)
routerCarts.delete("/:id/products/:id_prod", requireAuthentication, controllerDeleteProductFromCart)

export { routerCarts }