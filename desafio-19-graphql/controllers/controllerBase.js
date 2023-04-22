import { consoleLogger, fileLogger } from "../log/logger.js"

async function baseController(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = ${url} Method ${method}`)
    try {
        res.redirect("/login")
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} ${url}: ${error}`)
    }
}

export { baseController }