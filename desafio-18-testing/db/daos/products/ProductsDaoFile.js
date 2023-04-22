import fs from 'fs'

let instance = null

export default class ProductsDaoFile {

    ready = false

    constructor(URL) {
        this.URL = URL
        this.products = []
    }

    async connect() {
        try {
            await fs.promises.readFile(this.URL, 'utf-8')
            this.ready = true
            console.log('Started file system persistance for products')
        } catch {
            await fs.promises.writeFile(this.URL, '[]')
            this.ready = true
            console.log('Started file system persistance for products')
        }
    }

    async disconnect() {
        console.log('Ended file system persistance')
    }

    async readFile() {
        const text = await fs.promises.readFile(this.URL, 'utf-8')
        this.products = JSON.parse(text)
    }

    async writeFile() {
        const text = JSON.stringify(this.products, null, 2)
        await fs.promises.writeFile(this.URL, text)
    }

    getIndex(id) {
        return this.products.findIndex(product => product.id === id)
    }

    async getAll() { 
        await this.readFile()
        return this.products
    }

    async getById(id) {
        await this.readFile()
        return this.products[this.getIndex(id)]
    }

    async addProduct(product) {
        await this.readFile()
        let count = this.products.length
        product.id = count + 1
        this.products.push(product)
        await this.writeFile()
        return product.id
    }

    async deleteById(id) {
        await this.readFile()
        const [ deleted ] = this.products.splice(this.getIndex(id), 1)
        await this.writeFile()
        console.log(deleted)
        return deleted
    }

    async deleteAll() {
        this.products = []
        await this.writeFile()
    }

    async updateById(id, data) {
        await this.readFile()
        const index = this.getIndex(id)
        const updated = { ...this.products[index], ...data}
        this.products.splice(index, 1, updated)
        await this.writeFile()
        return updated
    }

    static getInstance(){
        if (!instance){
            instance = new ProductsDaoFile("./db/files/products.txt")
        }
        return instance
    }
}