import { fileLogger } from "../log/logger.js"
import { daoCarts,daoProducts } from "../db/daos/daoFactory.js"

async function getCarts(){
    try {
        return await daoCarts.getAll()
    } catch (error) {
        fileLogger.warn(`Error en la función getCarts`) 
    }
}

async function getProductsInCart(id) {
    try {
        const cart = await daoCarts.getById(id)
        return cart.products
    } catch (error) {
        fileLogger.warn(`Error en la función getProductsInCart`)
    }

}

async function addProductToCart(idProd, idCart) {
    try {
        let product = await daoProducts.getById(idProd)  
        if(!product){
            return {result: "Selected product does not exist"}
        } else {
            await daoCarts.addItemToCart(product, idCart)
            return { added: product, cartId: idCart }
        }
        
    } catch (error) {
        fileLogger.warn(`Error en la función addProductToCart`)
    }
}

async function deleteProductFromCart(idProd, idCart) {
    try {
        const result = await daoCarts.deleteItemFromCart(idProd, idCart)
        if(result.modifiedCount == 0){
            return { result: `The specificed cart does not contain the selected product` }
        }
        return { result, deletedIdProd: `${idProd}`, cartId: `${idCart}` }
    } catch (error) {
        fileLogger.warn(`Error en la función deleteProductFromCart`)
    }
}

export { getCarts,  getProductsInCart, addProductToCart, deleteProductFromCart }