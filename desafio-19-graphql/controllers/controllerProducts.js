import { serviceProductsGetAll, serviceProductsGetOne, serviceProductsCreateProduct, serviceProductsModifyProduct, serviceProductsDeleteProduct } from "../services/serviceProducts.js"
import { v4 as uuidv4 } from 'uuid';
import { consoleLogger, fileLogger } from "../log/logger.js"

//Create boolean variable for administrator rights and assign true
let administrador = true

async function controllerProductsGet(req, res) {
    const { id } = req.params
    const { url, method } = req
    consoleLogger.info(`Route = /api/products${url} Method ${method}`)
    const userEmail = req.session.passport.user
    if (id === undefined) {
        const { items, cartId } = await serviceProductsGetAll(userEmail)
        res.render("products", { items: items, cartId: `/api/carts/${cartId}/products` })
    } else {
        try {
            const item = await serviceProductsGetOne(parseInt(id))
            if (item[0] === undefined) {
                res.json({result: "Product not found"})
            } else {
                const { items, cartId } = await serviceProductsGetAll(userEmail)
                item[0].url = "../../assets/products/" + item[0].url
                res.render("products", { items: item, cartId: `/api/carts/${cartId}/products` })
            }
        } catch (error) {
            fileLogger.warn(`Error en ruta ${method} /api/products${url}: ${error}`)
        }
    }
}

async function controllerProductsPost(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = /api/products${url} Method ${method}`)
    if (!administrador) {
        res.json({ error: -1, descripcion: "Route /api/products Method POST not authorized" })
        return
    }
    try {
        req.body.timestamp = new Date().toUTCString()
        req.body.code = uuidv4()
        const productId = await serviceProductsCreateProduct(req.body)
        req.body.id = productId
        res.json({ added: req.body, assignedId: productId })
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} /api/products${url}: ${error}`)
    }
}

async function controllerProductsPut(req, res) {
    if (!administrador) {
        res.json({ error: -1, descripcion: `Ruta /api/products/${id} Method PUT not authorized` })
        return
    }
    const { url, method } = req
    consoleLogger.info(`Route = /api/products${url} Method ${method}`)
    try {
        let { id } = req.params
        const data = req.body
        let updatedItem = await serviceProductsModifyProduct(id, data)
        res.json({ updated: updatedItem })
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} /api/products${url}: ${error}`)
    }
}

async function controllerProductsDelete(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = /api/products${url} Method ${method}`)
    const { id } = req.params
    if (!administrador) {
        res.json({ error: -1, descripcion: `Ruta /api/carts/${id} method DELETE not authorized` })
        return
    }
    try {
        const deletedItem = await serviceProductsDeleteProduct(id)
        const response = {deleted: deletedItem}
        res.json(response)
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} /api/carts${url}: ${error}`)
    }
}

export { controllerProductsGet, controllerProductsPost, controllerProductsPut, controllerProductsDelete }