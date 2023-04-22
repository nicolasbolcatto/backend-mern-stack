import { fileLogger } from "../log/logger.js"

async function controllerConfirmSuccess(req, res) {
    try {
        setTimeout(() => {
            res.redirect("/api/productos")
        }, 2000)
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} ${url}: ${error}`)
    }
}

export { controllerConfirmSuccess }