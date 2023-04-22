import { Strategy as LocalStrategy } from "passport-local"
import bcrypt from "bcrypt"
import { sendMailRegister } from "./messages.js"
import { daoUsers, daoCarts } from "../db/daos/daoFactory.js"

const registerNewUser = (req, email, password, done) => {
    daoUsers.getAll().then(users => {
        const currentUser = users.find(user => user.email == email)

        if (currentUser) {
            return done(null, false)
        }

        const cart = daoCarts.addCart(email)
        const cartId = cart.id

        const saltRounds = 10;

        const {name,address,age,phone} = req.body

        bcrypt.hash(password, saltRounds, function(err, hash) {
            const newUser = {
                email,
                hash,
                name,
                address,
                age,
                phone,
                avatarUrl : "./assets/users/avatar.png",
                cartId
            }
            daoUsers.insertItems(newUser)

            const emailSender = process.env.EMAIL_ADDRESS_SENDER
            const passwordSender = process.env.EMAIL_PASSWORD_SENDER
            const emailReceiver = process.env.EMAIL_ADMIN

            sendMailRegister(emailSender, passwordSender, emailReceiver, newUser)

            done(null, newUser)
        });
    })

}

const loginUser = (email, password, done) => {
    daoUsers.getAll().then(users => {
        const currentUser = users.find(user => user.email == email)
        if (!currentUser) {
            return done(null, false)
        }

        bcrypt.compare(password, currentUser.hash, function(err, result) {
            if (result) {
                return done(null, currentUser)
            } else {
                return done(null, false)
            }
        });
    })


}

const registerStrategy = new LocalStrategy({
    passReqToCallback: true,
    usernameField: 'emailId',
    passwordField: 'password'
}, registerNewUser)

const loginStrategy = new LocalStrategy({
    usernameField: 'emailId',
    passwordField: 'password'
}, loginUser)

const serializer = (err, user, done) => {
    done(null, user.email)
}

const deserializer = (err, email, done) => {
    daoUsers.getAll().then(users => {
        const currentUser = users.find(user => user.email == email)
        done(null, currentUser)
    })

}

export { registerStrategy, loginStrategy, serializer, deserializer }