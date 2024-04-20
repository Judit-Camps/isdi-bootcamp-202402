import { ContentError, UnauthorizedError } from "./errors"
import util from "./util"

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASSWORD_REGEX = /^(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]+$/

const validate = {
    text(text, explain, checkEmptySpaces?) {
        if (typeof text !== "string") throw new TypeError(`${explain}: ${text} is not a stirng`)
        if (!text.trim().length) throw new ContentError(`${explain}: >${text}< is empty or blank`)

        if (checkEmptySpaces) {
            if (text.includes(" ")) throw new ContentError(`${explain}: ${text} has empty spaces`)
        }
    },

    password(password, explain = "password") {
        if (!PASSWORD_REGEX.test(password)) throw new ContentError(`${explain} is not valid`)
    },

    email(email, explain = "email") {
        if (!EMAIL_REGEX.test(email)) throw new ContentError(`${explain} is not valid`)
    }

    // token(token, explain = "token") {
    //     if (typeof token !== "string") throw new TypeError(`${explain} is not a string`)

    //     const { exp } = util.extractJwtPayload(token)

    //     if (exp * 1000 < Date.now()) throw new UnauthorizedError("session expired")
    // }

}

export default validate