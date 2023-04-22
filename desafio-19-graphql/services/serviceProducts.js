import { fileLogger } from "../log/logger.js"
import { daoCarts,daoProducts } from "../db/daos/daoFactory.js"

async function serviceProductsGetAll(object) {
    
    const carts = await daoCarts.getAll()
    const currentCart = carts.find(cart => cart.userEmail == object.userEmail)
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

async function serviceProductsGetOne(object) {
    try {
        const response = await daoProducts.getById(object.id)
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

async function serviceProductsModifyProduct(object) {
    try {
        return await daoProducts.updateById(Number(object.id), object.data)
    } catch (error) {
        fileLogger.warn(`Error en la función serviceProductsModifyProduct`)
    }
}

async function serviceProductsDeleteProduct(object) {
    try {
        return await daoProducts.deleteById(Number(object.id))
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