import CartsDaoMongoDB from "./carts/CartsDaoMongoDB.js"
import CartsDaoFile from "./carts/CartsDaoFile.js"
import ProductsDaoMongoDB from "./products/ProductsDaoMongoDB.js"
import ProductsDaoFile from "./products/ProductsDaoFile.js"
import UsersDaoMongoDB from "./users/UsersDaoMongoDB.js"
import UsersDaoFile from "./users/UsersDaoFile.js"


const choice = process.argv[2]
let daoUsers
let daoCarts
let daoProducts
switch (choice) {
    case 'MONGO':
        daoProducts = ProductsDaoMongoDB.getInstance()
        daoProducts.connect()
        daoCarts = CartsDaoMongoDB.getInstance()
        daoCarts.connect()
        daoUsers = UsersDaoMongoDB.getInstance()
        daoUsers.connect()
        break
    default:
        daoProducts = ProductsDaoFile.getInstance()
        daoProducts.connect()
        daoCarts = CartsDaoFile.getInstance()
        daoCarts.connect()
        daoUsers = UsersDaoFile.getInstance()
        daoUsers.connect()
}


export {daoCarts,daoProducts,daoUsers}
