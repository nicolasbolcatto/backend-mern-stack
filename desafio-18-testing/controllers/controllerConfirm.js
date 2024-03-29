import { sendMailOrder, sendMessage } from "../utils/messages.js"
import { consoleLogger, fileLogger } from "../log/logger.js"
import { serviceConfirmPost } from "../services/serviceConfirm.js"

async function controllerConfirmPost(req, res) {
    const email = "agustin@gmail.com" //req.session.passport.user
    const { url, method } = req
    consoleLogger.info(`Route = ${url} Method ${method}`)
    try {
        const { emailSender, emailReceiver, passwordSender, currentUser, phoneString, currentCart } = await serviceConfirmPost(email)
        sendMailOrder(emailSender, passwordSender, emailReceiver, currentCart, currentUser)
        sendMessage(currentUser, phoneString)
        res.redirect("/confirm-success")
    } catch (error) {
        fileLogger.warn(`Error en ruta ${method} ${url}: ${error}`)
    }
}

export { controllerConfirmPost }