import { describe } from "node:test";
import { expect } from "chai";
import { responseGetProductsInCart,responseDeleteProductFromCart, responseAddProductToCart } from "./client.js";

describe("Testing carts", () => {
    it("Testing GET products from a cart", async() => {
        expect(responseGetProductsInCart.status).to.eql(200)  
    })
    it("Testing correct adding  (POST) of products to a cart", async() => {
        expect(responseAddProductToCart.status).to.eql(200)
        expect(responseAddProductToCart.body).to.be.an("object")
        expect(responseDeleteProductFromCart.body).to.satisfy((body) => {
            if (typeof body === 'object' && body.added && body.cartId) {
                return true
            } else if (body.result){
                return true
            }
            return false
          });
    
    })
    it("Testing correct deletion of a product from a cart", async() => {
        expect(responseDeleteProductFromCart.status).to.eql(200)
        expect(responseDeleteProductFromCart.body).to.be.an("object")
        expect(responseDeleteProductFromCart.body).to.satisfy((body) => {
            if (typeof body === 'object' && body.deletedIdProd && body.cartId) {
                return true
            } else if (typeof body === 'object' && body.result == "The specificed cart does not contain the selected product"){
                return true
            }
            return false
          });
    
    })
})