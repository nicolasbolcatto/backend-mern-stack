import fs from 'fs'

let instance = null

export default class UsersDaoFile {

    ready = false

    constructor(URL) {
        this.URL = URL
        this.users = []
    }

    async connect() {
        try {
            await fs.promises.readFile(this.URL, 'utf-8')
            this.ready = true
            console.log('Started file system persistance for users')
        } catch {
            await fs.promises.writeFile(this.URL, '[]')
            this.ready = true
            console.log('Started file system persistance for users')
        }
    }

    async disconnect() {
        console.log('Ended file system persistance')
    }

    async readFile() {
        const text = await fs.promises.readFile(this.URL, 'utf-8')
        this.users = JSON.parse(text)
    }

    async writeFile() {
        const text = JSON.stringify(this.users, null, 2)
        await fs.promises.writeFile(this.URL, text)
        await this.disconnect()
    }

    getIndex(email) {
        return this.users.findIndex(user => user.email === email)
    }

    async getAll() { 
        await this.readFile()
        return this.users
    }

    async getById(id) {
        await this.readFile()
        return this.users[this.getIndex(id)]
    }

    async insertItems(user) {
        await this.readFile()
        this.users.push(user)
        await this.writeFile()
        return user
    }

    async modifyUserByEmail(email, data) {
        await this.readFile()
        const index = this.getIndex(email)
        const updated = { ...this.users[index], ...data}
        this.users.splice(index, 1, updated)
        await this.writeFile()
        return updated
    }

    static getInstance(){
        if (!instance){
            instance = new UsersDaoFile("./db/files/users.txt")
        }
        return instance
    }
}