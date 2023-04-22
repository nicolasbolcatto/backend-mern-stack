import fs from 'fs'

let instance = null

export default class CartsDaoFile {

    ready = false

    constructor(URL) {
        this.URL = URL
        this.carts = []
    }

    async connect() {
        try {
            await fs.promises.readFile(this.URL, 'utf-8')
            this.ready = true
            console.log('Started file system persistance for carts')
        } catch {
            await fs.promises.writeFile(this.URL, '[]')
            this.ready = true
            console.log('Started file system persistance for carts')
        }
    }

    async disconnect() {
        console.log('Ended file system persistance')
    }

    async readFile() {
        const text = await fs.promises.readFile(this.URL, 'utf-8')
        this.carts = JSON.parse(text)
    }

    async writeFile() {
        const text = JSON.stringify(this.carts, null, 2)
        await fs.promises.writeFile(this.URL, text)
    }

    getIndex(id) {
        return this.carts.findIndex(cart => cart.id === id)
    }

    async getAll() { 
        await this.readFile()
        return this.carts
    }

    async getById(id) {
        await this.readFile()
        return this.carts[this.getIndex(id)]
    }

    async addCart(userEmail) {
        await this.readFile()
        let count = this.carts.length
        let id = count + 1
        let cart = { products: [], id: id, timestamp: new Date().toUTCString(), userEmail: userEmail }
        this.carts.push(cart)
        await this.writeFile()
        return cart
    }

    async deleteById(id) {
        await this.readFile()
        const [ deleted ] = this.carts.splice(this.getIndex(id), 1)
        await this.writeFile()
        return deleted
    }

    async deleteAll() {
        this.carts = []
        await this.writeFile()
    }

    async updateById(id, data) {
        await this.readFile()
        const index = this.getIndex(id)
        const updated = { ...this.carts[index], ...data}
        this.carts.splice(index, 1, updated)
        await this.writeFile()
        return updated
    }

    async addItemToCart(item, idCart) {
        await this.readFile()
        const currentCart = await this.getById(idCart)
        currentCart.products.push(item)
        await this.writeFile()
        return item
    }

    async deleteItemFromCart(idProd, idCart) {
        await this.readFile()
        const index = this.getIndex(idCart)
        if (index){
            this.carts[index].products.splice(index, 1, updated)
            return {modifiedCount: 1}
        } else {
            return {modifiedCount: 0}
        }
        
    }

    static getInstance(){
        if (!instance){
            instance = new CartsDaoFile("./db/files/carts.txt")
        }
        return instance
    }
}