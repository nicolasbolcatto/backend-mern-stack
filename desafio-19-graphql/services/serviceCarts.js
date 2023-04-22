import { fileLogger } from "../log/logger.js"
import { daoCarts,daoProducts } from "../db/daos/daoFactory.js"

async function getCarts(){
    try {
        return await daoCarts.getAll()
    } catch (error) {
        fileLogger.warn(`Error en la función getCarts`) 
    }
}

async function getProductsInCart(object) {
    try {
        const cart = await daoCarts.getById(object.id)
        return cart.products
    } catch (error) {
        fileLogger.warn(`Error en la función getProductsInCart`)
    }

}

async function addProductToCart(object) {
    try {
        let product = await daoProducts.getById(object.idProd)
        if(!product){
            return {result: "Selected product does not exist"}
        } else {
            await daoCarts.addItemToCart(product, object.idCart)
            return { added: product, cartId: object.idCart }
        }
        
    } catch (error) {
        fileLogger.warn(`Error en la función addProductToCart`)
    }
}

async function deleteProductFromCart(object) {
    try {
        const result = await daoCarts.deleteItemFromCart(object.idProd, object.idCart)
        console.log(result)
        if(result.modifiedCount == 0){
            return { result: `The specificed cart does not contain the selected product` }
        }
        return { result, deletedIdProd: `${object.idProd}`, cartId: `${object.idCart}` }
    } catch (error) {
        fileLogger.warn(`Error en la función deleteProductFromCart`)
    }
}

export { getCarts,  getProductsInCart, addProductToCart, deleteProductFromCart }