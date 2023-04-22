import { consoleLogger, fileLogger } from "../log/logger.js"

async function byeController(req, res) {
    const { url, method } = req
    consoleLogger.info(`Route = ${url} Method ${method}`)
    try {
        res.redirect("/login")
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} bye/${url}: ${error}`)
    }
}

export { byeController }