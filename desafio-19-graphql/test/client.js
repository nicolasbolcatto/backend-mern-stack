import request from 'supertest'

let randomProductData = {
    id: 4,
    category: "lorem ipsum",
    name: "lorem ipsum",
    price: 99,
    description: "lorem ipsum",
    standards: "lorem ipsum",
    unit: "lorem ipsum",
    url: "lorem ipsum",
    materialRequired: "lorem ipsum",
    stock: 99
}

let responseGetProductsInCart = await request("http://localhost:8080").get(`/api/carts/1/products`)
let responseAddProductToCart = await request("http://localhost:8080").post(`/api/carts/1/products/3`)
let responseDeleteProductFromCart = await request("http://localhost:8080").delete(`/api/carts/1/products/3`)

let responseGetAllProducts = await request("http://localhost:8080").get(`/api/products`)
let responseGetOneProduct = await request("http://localhost:8080").get(`/api/products/3`)
let responseCreateNewProduct = await request("http://localhost:8080").post(`/api/products`, randomProductData)
let responseEditProduct = await request("http://localhost:8080").put(`/api/products`, randomProductData)
let responseDeleteProduct = await request("http://localhost:8080").delete(`/api/products/4`)

let responseGetLogin = await request("http://localhost:8080").get(`/login`)
let responseGetFailLogin = await request("http://localhost:8080").get(`/fail-login`)
let responsePostLogin = await request("http://localhost:8080").post(`/login`)
let responseGetRegister = await request("http://localhost:8080").get(`/register`)
let responseGetFailRegister = await request("http://localhost:8080").get(`/fail-register`)
let responsePostRegister = await request("http://localhost:8080").post(`/register`)

export{responseGetProductsInCart,
    responseAddProductToCart,
    responseDeleteProductFromCart,
    responseGetAllProducts,
    responseGetOneProduct,
    responseCreateNewProduct,
    responseEditProduct,
    responseDeleteProduct,
    responseGetLogin,
    responseGetFailLogin,
    responsePostLogin,
    responseGetRegister,
    responseGetFailRegister,
    responsePostRegister
}
