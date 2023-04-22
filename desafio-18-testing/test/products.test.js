import { describe } from "node:test";
import { expect } from "chai";
import { responseGetAllProducts,responseGetOneProduct,responseCreateNewProduct, responseEditProduct, responseDeleteProduct } from "./client.js";

describe("Testing products", () => {
    it("Testing correct GET of all products", async() => {
        expect(responseGetAllProducts.status).to.eql(200)
    });
    it("Testing correct GET of one products", async() => {
        expect(responseGetOneProduct.status).to.eql(200)
    });
    it("Testing correct creation (POST) of one product", async() => {
        expect(responseCreateNewProduct.status).to.eql(200)
        expect(responseCreateNewProduct.body).to.be.an("object")
        expect(responseCreateNewProduct.body).to.have.all.keys('added','assignedId')
        expect(responseCreateNewProduct.body.added).to.have.all.keys('timestamp','code','id')
        expect(responseCreateNewProduct.body.assignedId).to.be.a('number')
    });
    if("Testing correct edition (PUT) of one product", async() => {
        expect(responseEditProduct.status).to.eql(200)
        expect(responseEditProduct.body).to.be.an("object")
        expect(responseEditProduct.body).to.have.all.keys('id','category','name','price','description','standards','unit','url','materialRequired','stock')
        expect(responseEditProduct.body.id).to.be.a('number')
        expect(responseEditProduct.body.category).to.be.a('string')
        expect(responseEditProduct.body.name).to.be.a('string')
        expect(responseEditProduct.body.price).to.be.a('number')
        expect(responseEditProduct.body.description).to.be.a('string')
        expect(responseEditProduct.body.standards).to.be.a('string')
        expect(responseEditProduct.body.unit).to.be.a('string')
        expect(responseEditProduct.body.url).to.be.a('string')
        expect(responseEditProduct.body.materialRequired).to.be.a('string')
        expect(responseEditProduct.body.stock).to.be.a('number')
    });
    it("Testing correct deletion (DELETE) of one product", async () => {
        expect(responseDeleteProduct.status).to.eql(200)
        expect(responseDeleteProduct.body.deleted).to.be.an('object')
    })
});