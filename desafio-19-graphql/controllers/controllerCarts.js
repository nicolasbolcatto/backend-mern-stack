import { consoleLogger, fileLogger } from "../log/logger.js"
import { getProductsInCart, addProductToCart, deleteProductFromCart } from "../services/serviceCarts.js"

async function controllerGetProductsInCart(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = /api/carts${url} Method ${method}`)
    try {
        const { id } = req.params
        const products = await getProductsInCart(Number(id))
        res.render("cart", { cart: products })
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} /api/carts${url}: ${error}`)
    }
}

async function controllerAddProductToCart(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = /api/carts${url} Method ${method}`)
    try {
        const params = req.params
        const idCart = Number(params.id)
        const idProd = Number(params.id_prod)
        const response = await addProductToCart(idProd, idCart)
        res.json(response)
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} /api/carts${url}: ${error}`)
    }
}

async function controllerDeleteProductFromCart(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = /api/carts${url} Method ${method}`)
    try {
        const params = req.params
        const idCart = Number(params.id)
        const idProd = Number(params.id_prod)
        const response = await deleteProductFromCart(idProd, idCart)
        res.json(response)
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} /api/carts${url}: ${error}`)
    }
}

export {
    controllerGetProductsInCart,
    controllerAddProductToCart,
    controllerDeleteProductFromCart
}