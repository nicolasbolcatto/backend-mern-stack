import { fileLogger } from "../log/logger.js"

async function uncaughtController(req, res) {
    try {
        const { url, method } = req
        fileLogger.warn(`Ruta ${method} ${url} no esta implementada`)
        res.send(`Ruta ${method} ${url} no esta implementada`)
    } catch (error) {
        fileLogger.error(`Error: ${error}`)
    }
}

export { uncaughtController }