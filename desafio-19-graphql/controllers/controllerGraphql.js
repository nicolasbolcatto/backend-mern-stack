import { buildSchema } from 'graphql'
import {graphqlHTTP} from "express-graphql"
import { addProductToCart, deleteProductFromCart, getCarts, getProductsInCart } from '../services/serviceCarts.js'
import { serviceProductsCreateProduct, serviceProductsDeleteProduct, serviceProductsGetAll, serviceProductsGetOne, serviceProductsModifyProduct } from '../services/serviceProducts.js'

const schema = buildSchema(`
type Product {
    id: Int,
    category: String,
    name: String,
    price: Float,
    description: String,
    standards: String,
    unit: String,
    url: String,
    materialRequired: String,
    stock: Int
}
input ProductAdd {
    category: String,
    name: String,
    price: Float,
    description: String,
    standards: String,
    unit: String,
    url: String,
    materialRequired: String,
    stock: Int
}
type Cart {
    products: [Product],
    id: Int,
    timestamp: String,
    userEmail: String
}
type AddedProduct {
    added: Product,
    cartId: Int
}
type DeletedProduct {
    result: String,
    deletedIdProd: Int,
    cartId: Int
}

type AllProducts {
    items: [Product],
    cartId: Int
}
type Query {
    getAllCarts: [Cart],
    getProductsInCart(id: Int): [Product],
    getAllProducts(userEmail: String): AllProducts,
    getOneProduct(id: Int): [Product]
}
type Mutation {
    addProductToCart(idProd: Int, idCart: Int): AddedProduct,
    deleteProductFromCart(idProd: Int, idCart: Int): DeletedProduct,
    createProduct(data: ProductAdd): Int,
    modifyProduct(id: Int, data: ProductAdd): Product,
    deleteProduct(id: Int): Product
}
`)

export default class GraphqlController {
    constructor() {
        return graphqlHTTP({
            schema: schema,
            rootValue: {
                getAllCarts: getCarts,
                getProductsInCart: getProductsInCart,
                addProductToCart: addProductToCart,
                deleteProductFromCart: deleteProductFromCart,
                getAllProducts: serviceProductsGetAll,
                getOneProduct: serviceProductsGetOne,
                createProduct: serviceProductsCreateProduct,
                modifyProduct: serviceProductsModifyProduct,
                deleteProduct: serviceProductsDeleteProduct
            },
            graphiql: true
        })
    }
}