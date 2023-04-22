import { fileLogger } from "../log/logger.js"
import { daoCarts,daoProducts } from "../db/daos/daoFactory.js"

async function serviceProductsGetAll(userEmail) {
    const carts = await daoCarts.getAll()
    const currentCart = carts.find(cart => cart.userEmail == userEmail)
    const cartId = currentCart.id
    try {
        let items = await daoProducts.getAll()
        items.forEach(item => {
            item.url = "../../assets/products/" + item.url
        })
        return { items, cartId }
    } catch (error) {
        fileLogger.warn(`Error en la función serviceProductsGetAll`)
    }
}

async function serviceProductsGetOne(id) {
    try {
        const response = await daoProducts.getById(id)
        return [response]
    } catch (error) {
        fileLogger.warn(`Error en la función serviceProductsGetOne`)
    }

}

async function serviceProductsCreateProduct(req) {
    try {
        return await daoProducts.addProduct(req)
    } catch (error) {
        fileLogger.warn(`Error en la función serviceProductsGetProductId`)
    }
}

async function serviceProductsModifyProduct(id, data) {
    try {
        return await daoProducts.updateItemById(Number(id), data)
    } catch (error) {
        fileLogger.warn(`Error en la función serviceProductsModifyProduct`)
    }
}

async function serviceProductsDeleteProduct(id) {
    try {
        return await daoProducts.deleteById(Number(id))
    } catch (error) {
        fileLogger.warn(`Error en la función serviceProductsDeleteProduct`)
    }
}

export {
    serviceProductsGetAll,
    serviceProductsGetOne,
    serviceProductsCreateProduct,
    serviceProductsModifyProduct,
    serviceProductsDeleteProduct
}